use actix_web::web;
use auth::auth_routes;
use extra::extra_routes;
use hello::health_check;
use product_management::product_management_routes;
use utoipa::OpenApi;

mod auth;
mod extra;
mod hello;
mod product_management;

#[utoipauto::utoipauto(paths = "./routers/admin/src")]
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
            .service(health_check)
            .service(auth_routes())
            .service(extra_routes())
            .service(product_management_routes()),
    );
}
