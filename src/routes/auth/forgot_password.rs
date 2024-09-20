use crate::{extractors::validator::ValidatedJson, validator::auth::ForgotPassword};
use actix_web::{post, HttpResponse};

/// Forgot Password
#[utoipa::path(
  tag = "Auth", 
  context_path = "/auth",
  request_body(content = ForgotPassword),
  responses( (status=200, body = Response) )
)
]
#[post("/forgot-password")]
pub async fn forgot_password(
    input: ValidatedJson<ForgotPassword>,
) -> Result<HttpResponse, actix_web::Error> {
    println!("login {:#?}", input);

    Ok(HttpResponse::Ok().body("forgot password"))
}
