use actix_web::web;
mod auth;
use extra::extra_routes;
use utoipa::OpenApi;

mod extra;
mod hello;

#[utoipauto::utoipauto(paths = "./routers/admin")]
#[derive(OpenApi)]
#[openapi(info(title = "Mcart admin api documentation"), paths())]
struct ApiDoc;

#[derive(OpenApi)]
#[openapi(
    nest(
        (path = "/admin", api = ApiDoc)
    ),
)]
pub struct AdminApiDoc;

pub fn admin_routes(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("/admin")
            .service(hello::health_check)
            .service(auth::admin_auth_routes())
            .service(extra_routes()),
    );
}
