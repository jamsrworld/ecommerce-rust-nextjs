use actix_web::{ get, HttpResponse, Responder };

/// Get All Orders
#[utoipa::path(tag = "Order", context_path = "/user/orders")]
#[get("")]
pub async fn get_orders() -> impl Responder {
    HttpResponse::Ok().body("get orders")
}
