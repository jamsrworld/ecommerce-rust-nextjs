use actix_web::{patch, HttpResponse, Responder};

/// Change Password
#[utoipa::path(tag = "Profile", context_path = "/user/profile")]
#[patch("/password")]
pub async fn change_password() -> impl Responder {
    HttpResponse::Ok().body("password updated")
}
