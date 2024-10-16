use actix_web::{get, HttpResponse, Responder};

/// Get An Order
#[utoipa::path(tag = "Order", context_path = "/user/orders")]
#[get("/id")]
pub async fn get_order() -> impl Responder {
    HttpResponse::Ok().body("get order")
}
