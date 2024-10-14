use actix_web::{get, HttpResponse, Responder};
use crate::extractors::auth::Authenticated;

/// Get Profile
#[utoipa::path(
  tag = "User",
  context_path = "/profile",
  responses( (status=200, body = String) )
)]
#[get("/user")]
pub async fn get_user(user: Authenticated) -> impl Responder {
    println!("user{:#?}", user);
    HttpResponse::Ok().json(user)
}
