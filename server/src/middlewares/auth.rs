use crate::{error::HttpError, utils::jwt::decode_token, AppState};
use actix_web::{
    dev::{Service, ServiceRequest, ServiceResponse, Transform},
    error::{ErrorForbidden, ErrorInternalServerError, ErrorUnauthorized},
    web, HttpMessage,
};
use entity::{sea_orm_active_enums::UserRole, user};
use futures_util::{
    future::{ready, LocalBoxFuture, Ready},
    FutureExt,
};
use sea_orm::EntityTrait;
use std::rc::Rc;

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

impl<S> Transform<S, ServiceRequest> for RequireAuth
where
    S: Service<
            ServiceRequest,
            Response = ServiceResponse<actix_web::body::BoxBody>,
            Error = actix_web::Error,
        > + 'static,
{
    type Response = ServiceResponse<actix_web::body::BoxBody>;
    type Error = actix_web::Error;
    type Transform = AuthMiddleware<S>;
    type InitError = ();
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(AuthMiddleware {
            service: Rc::new(service),
            allowed_roles: self.allowed_roles.clone(),
        }))
    }
}

pub struct AuthMiddleware<S> {
    service: Rc<S>,
    allowed_roles: Rc<Vec<UserRole>>,
}

impl<S> Service<ServiceRequest> for AuthMiddleware<S>
where
    S: Service<
            ServiceRequest,
            Response = ServiceResponse<actix_web::body::BoxBody>,
            Error = actix_web::Error,
        > + 'static,
{
    type Response = ServiceResponse<actix_web::body::BoxBody>;
    type Error = actix_web::Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, actix_web::Error>>;

    fn poll_ready(
        &self,
        ctx: &mut core::task::Context<'_>,
    ) -> std::task::Poll<Result<(), Self::Error>> {
        self.service.poll_ready(ctx)
    }

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let token = req.cookie("x-session").map(|c| c.value().to_string());
        if token.is_none() {
            return Box::pin(ready(Err(ErrorUnauthorized(HttpError::unauthorized(
                "Token not found",
            )))));
        }
        let token = token.unwrap();

        let app_state = req.app_data::<web::Data<AppState>>().unwrap(); 
        let user_id = match decode_token(&token) {
            Ok(id) => id,
            Err(e) => {
                return Box::pin(ready(Err(ErrorUnauthorized(HttpError::unauthorized(
                    e.to_string(),
                )))))
            }
        };

        let cloned_app_state = app_state.clone();
        let allowed_roles = self.allowed_roles.clone();
        let srv = Rc::clone(&self.service);

        async move {
            let user = entity::user::Entity::find_by_id(user_id)
                .one(&cloned_app_state.db)
                .await
                .map_err(|e| {
                    ErrorInternalServerError(HttpError::internal_server_error(e.to_string()))
                })?;
            let user = user.ok_or(ErrorUnauthorized(HttpError::not_found("User not found")))?;

            if allowed_roles.contains(&user.role) {
                req.extensions_mut().insert::<user::Model>(user);
                let res = srv.call(req).await?;
                Ok(res)
            } else {
                Err(ErrorForbidden(HttpError::forbidden("Permission denied")))
            }
        }
        .boxed_local()
    }
}
