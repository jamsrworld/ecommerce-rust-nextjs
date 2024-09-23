use crate::error::HttpError;
use crate::{extractors::validator::ValidatedJson, validator::auth::ForgotPassword};
use actix_web::{post, HttpResponse};
use askama::Template;

#[derive(Template)]
#[template(path = "welcome.jinja")]
pub struct WelcomeEmailTemplate<'a> {
    pub username: &'a str,
    pub heading: &'a str,
}

/// Forgot Password
#[utoipa::path(
  tag = "Auth", 
  context_path = "/auth",
  request_body(content = ForgotPassword),
  responses( (status=200, body = ForgotPassword) )
)
]
#[post("/forgot-password")]
pub async fn forgot_password(
    input: ValidatedJson<ForgotPassword>,
) -> Result<HttpResponse, HttpError> {
    let ForgotPassword { email } = input.into_inner();

    println!("Email sent successfully!");

    Ok(HttpResponse::Ok().body("forgot password"))
}
