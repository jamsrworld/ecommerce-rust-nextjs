use actix_web::web;
use auth::auth_routes;
use hello::health_check;
use utoipa::OpenApi;
mod auth;
mod hello;
mod user;

use user::user_routes;

#[utoipauto::utoipauto(paths = "./routers/www")]
#[derive(OpenApi)]
#[openapi(info(title = "Mcart api documentation"), paths())]
pub struct WwwApiDoc;

pub fn www_routes(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("")
            .service(health_check)
            .service(auth_routes())
            .configure(user_routes),
    );
}
