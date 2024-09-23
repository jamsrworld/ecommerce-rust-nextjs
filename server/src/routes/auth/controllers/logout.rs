use actix_web::{delete, HttpResponse};

/// Logout
#[utoipa::path(
  tag = "Auth", 
  context_path = "/auth",
  responses( (status=200, body = Response) )
)
]
#[delete("/logout")]
pub async fn logout() -> Result<HttpResponse, actix_web::Error> {
    Ok(HttpResponse::Ok().body("logout"))
}
