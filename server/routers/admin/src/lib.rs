use actix_web::web;
mod auth;
use utoipa::OpenApi;

#[utoipauto::utoipauto(paths = "./routers/admin")]
#[derive(OpenApi)]
#[openapi(info(title = "Mcart api documentation"), paths())]
pub struct AdminApiDoc;

pub fn admin_routes(config: &mut web::ServiceConfig) {
    config.service(web::scope("/").service(auth::admin_auth_routes()));
}
