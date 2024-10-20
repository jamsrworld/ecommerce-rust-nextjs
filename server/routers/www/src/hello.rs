use actix_web::HttpResponse;
use actix_web::Responder;
use actix_web::get;
use serde_json::json;

#[utoipa::path(
    tag = "Home",
    responses((status = 200, description = "health check", body = String))
)]
#[get("/")]
async fn health_check() -> impl Responder {
    let output = json!({
      "message":"Rust api with actix web",
      "version":1
      });
    HttpResponse::Ok().json(output)
}
