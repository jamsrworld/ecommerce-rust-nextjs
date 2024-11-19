use actix_web::{
    body::EitherBody,
    dev::{ forward_ready, Service, ServiceRequest, ServiceResponse, Transform },
    http::StatusCode,
    web,
    HttpMessage,
    HttpResponse,
};
use entity::{ sea_orm_active_enums::UserRole, user };
use futures_util::future::{ ok, LocalBoxFuture, Ready };
use sea_orm::EntityTrait;
use serde_json::json;
use std::rc::Rc;
use utils::{ jwt::decode_token, AppState };

pub struct RequireAuth {
    pub allowed_roles: Rc<Vec<UserRole>>,
}

impl RequireAuth {
    pub fn allowed_roles(roles: Vec<UserRole>) -> Self {
        Self {
            allowed_roles: Rc::new(roles),
        }
    }
}

impl<S: 'static, B> Transform<S, ServiceRequest>
    for RequireAuth
    where
        S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = actix_web::Error>,
        S::Future: 'static,
        B: 'static
{
    type Response = ServiceResponse<EitherBody<B>>;
    type Error = actix_web::Error;
    type InitError = ();
    type Transform = AuthMiddleware<S>;
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ok(AuthMiddleware {
            service: Rc::new(service),
            allowed_roles: self.allowed_roles.clone(),
        })
    }
}

pub struct AuthMiddleware<S> {
    service: Rc<S>,
    allowed_roles: Rc<Vec<UserRole>>,
}

fn to_service_response<B>(
    req: ServiceRequest,
    status_code: StatusCode,
    message: &str
) -> ServiceResponse<EitherBody<B>> {
    let (request, _) = req.into_parts();
    let response = HttpResponse::build(status_code)
        .json(json!({
        "message":message,
        "status_code":status_code.as_str()
    }))
        .map_into_right_body();
    return ServiceResponse::new(request, response);
}

impl<S, B> Service<ServiceRequest>
    for AuthMiddleware<S>
    where
        S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = actix_web::Error> +
            'static,
        S::Future: 'static,
        B: 'static
{
    type Response = ServiceResponse<EitherBody<B>>;
    type Error = actix_web::Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let token = req.cookie("x-session").map(|c| c.value().to_string());
        if token.is_none() {
            let message = "Token not found";
            let res: ServiceResponse<EitherBody<B>> = to_service_response(
                req,
                StatusCode::UNAUTHORIZED,
                message
            );
            return Box::pin(async { Ok(res) });
        }
        let token = token.unwrap();

        let app_state = req.app_data::<web::Data<AppState>>().unwrap();
        let jwt_secret = app_state.env.jwt_secret.to_owned();
        let user_id = match decode_token(&token, jwt_secret) {
            Ok(id) => id,
            Err(e) => {
                let message = e.to_string();
                let res: ServiceResponse<EitherBody<B>> = to_service_response(
                    req,
                    StatusCode::UNAUTHORIZED,
                    &message
                );
                return Box::pin(async { Ok(res) });
            }
        };

        let cloned_app_state = app_state.clone();
        let allowed_roles = self.allowed_roles.clone();

        let svc = self.service.clone();
        Box::pin(async move {
            let user = match
                entity::user::Entity
                    ::find_by_id(user_id)
                    // ::find_by_id(user_id)
                    .one(&cloned_app_state.db).await
            {
                Ok(user) => user,
                Err(e) => {
                    let message = e.to_string();
                    let res: ServiceResponse<EitherBody<B>> = to_service_response(
                        req,
                        StatusCode::INTERNAL_SERVER_ERROR,
                        &message
                    );
                    return Ok(res);
                }
            };

            if let Some(user) = user {
                if allowed_roles.contains(&user.role) {
                    req.extensions_mut().insert::<user::Model>(user);
                    let res = svc.call(req).await;
                    return res.map(ServiceResponse::map_into_left_body);
                } else {
                    let message = "Permission denied";
                    let res: ServiceResponse<EitherBody<B>> = to_service_response(
                        req,
                        StatusCode::FORBIDDEN,
                        message
                    );
                    return Ok(res);
                }
            } else {
                let message = "User not found";
                let res: ServiceResponse<EitherBody<B>> = to_service_response(
                    req,
                    StatusCode::UNAUTHORIZED,
                    message
                );
                return Ok(res);
            }
        })
    }
}
