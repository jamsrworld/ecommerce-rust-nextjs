use actix_web::{
    body::EitherBody,
    dev::{ forward_ready, Service, ServiceRequest, ServiceResponse, Transform },
    error::{ ErrorInternalServerError, ErrorUnauthorized },
    web,
    HttpMessage,
    HttpResponse,
};
use entity::{ sea_orm_active_enums::UserRole, user };
use futures_util::{ future::{ ok, ready, LocalBoxFuture, Ready }, FutureExt };
use sea_orm::EntityTrait;
use serde_json::json;
use std::rc::Rc;
use utils::{ error::HttpError, jwt::decode_token, AppState };

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

impl<S, B> Transform<S, ServiceRequest>
    for RequireAuth
    where
        S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = actix_web::Error>,
        S::Future: 'static,
        B: 'static
{
    type Response = ServiceResponse<EitherBody<B>>;
    type Error = actix_web::Error;
    type Transform = AuthMiddleware<S>;
    type InitError = ();
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

impl<S, B> Service<ServiceRequest>
    for AuthMiddleware<S>
    where
        S: Service<ServiceRequest, Response = ServiceResponse<B>, Error = actix_web::Error>,
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
            let (request, _pl) = req.into_parts();
            let response = HttpResponse::Unauthorized()
                .json(json!({
                "message":"Token not found"
            }))
                .map_into_right_body();

            return Box::pin(async { Ok(ServiceResponse::new(request, response)) });
        }
        let token = token.unwrap();

        let app_state = req.app_data::<web::Data<AppState>>().unwrap();
        let jwt_secret = app_state.env.jwt_secret.to_owned();
        let user_id = match decode_token(&token, jwt_secret) {
            Ok(id) => id,
            Err(e) => {
                return Box::pin(
                    ready(Err(ErrorUnauthorized(HttpError::unauthorized(e.to_string()))))
                );
            }
        };

        let cloned_app_state = app_state.clone();
        let allowed_roles = self.allowed_roles.clone();

        // let srv = Rc::clone(&self.service);

        let res = self.service.call(req);
        Box::pin(async move {
            let user = entity::user::Entity
                ::find_by_id(user_id)
                .one(&cloned_app_state.db).await
                .map_err(|e| {
                    ErrorInternalServerError(HttpError::internal_server_error(e.to_string()))
                })?
                .ok_or_else(|| ErrorUnauthorized(HttpError::not_found("User not found")))?;

                

            // if allowed_roles.contains(&user.role) {
            //     req.extensions_mut().insert::<user::Model>(user);
            //     let res = srv.call(req).await?;
            //     Ok(res)
            // } else {
            //     Err(ErrorForbidden(HttpError::forbidden("Permission denied")))
            // }

            // req.extensions_mut().insert::<user::Model>(user);
            res.await.map(ServiceResponse::map_into_left_body)
        })
    }
}
