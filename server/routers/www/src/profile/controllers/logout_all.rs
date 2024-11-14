use actix_web::{ patch, HttpResponse, Responder };

/// Logout All
#[utoipa::path(tag = "Profile", context_path = "/profile")]
#[patch("/logout-all")]
pub async fn logout_all() -> impl Responder {
    HttpResponse::Ok().body("logout all")
}
