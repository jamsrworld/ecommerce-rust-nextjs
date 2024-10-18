use actix_web::{get, web, HttpResponse, Responder};
mod auth;
use serde_json::json;
use utoipa::OpenApi;

#[utoipauto::utoipauto(paths = "./routers/admin")]
#[derive(OpenApi)]
#[openapi(info(title = "Mcart api documentation"), paths())]
pub struct AdminApiDoc;

#[get("")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "message":"Admin api"
    }))
}

pub fn admin_routes(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("/admin")
            .service(hello)
            .service(auth::admin_auth_routes()),
    );
}
