use actix_web::web;
use auth::auth_routes;
use utoipa::OpenApi;
mod auth;
mod user;

#[utoipauto::utoipauto(paths = "./routers/www")]
#[derive(OpenApi)]
#[openapi(info(title = "Mcart api documentation"), paths())]
pub struct WwwApiDoc;

pub fn www_routes(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("")
            .service(auth_routes())
            .configure(user::user_routes),
    );
}
