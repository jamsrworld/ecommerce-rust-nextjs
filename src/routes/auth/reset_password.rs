use crate::{extractors::validator::ValidatedJson, validator::auth::ResetPassword};
use actix_web::{post, HttpResponse};

/// Reset Password
#[utoipa::path(
  tag = "Auth", 
  context_path = "/auth",
  request_body(content = ResetPassword),
  responses( (status=200, body = Response) )
)
]
#[post("/reset-password")]
pub async fn reset_password(
    input: ValidatedJson<ResetPassword>,
) -> Result<HttpResponse, actix_web::Error> {
    println!("login {:#?}", input);

    Ok(HttpResponse::Ok().body("reset password"))
}
