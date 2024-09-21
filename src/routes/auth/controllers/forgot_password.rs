use crate::error::HttpError;
use crate::{extractors::validator::ValidatedJson, validator::auth::ForgotPassword};
use actix_web::{post, HttpResponse};
use askama::Template;
use lettre::transport::smtp::authentication::Credentials;
use lettre::transport::smtp::client::{Tls, TlsParameters};
use lettre::{Message, SmtpTransport, Transport};

#[derive(Template)]
#[template(path = "welcome.html")]
pub struct WelcomeEmailTemplate<'a> {
    pub username: &'a str,
}

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
) -> Result<HttpResponse, HttpError> {
    let ForgotPassword { email } = input.into_inner();

    // send email
    let username = "Aditya";
    let email_template = WelcomeEmailTemplate {
        username,
    };
    let render_email = email_template
        .render()
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    let username = "demo@jamsrworld.com".to_string();
    let password = "jamsrworld_demo97@".to_owned();
    let email = Message::builder()
        .from("Jamsrworld <demo@jamsrworld.com>".parse().unwrap())
        .to(email.parse().unwrap())
        .subject("Welcome email")
        .header(lettre::message::header::ContentType::TEXT_HTML)
        .body(render_email)
        .unwrap();

    let creds = Credentials::new(username, password);
    let tls_params = TlsParameters::builder("mail.jamsrworld.com".to_string())
        .dangerous_accept_invalid_certs(true)
        .build()
        .unwrap();

    let mailer = SmtpTransport::relay("mail.jamsrworld.com")
        .unwrap()
        .credentials(creds)
        .port(465)
        .tls(Tls::Wrapper(tls_params))
        .build();

    match mailer.send(&email) {
        Ok(_) => println!("Email sent successfully!"),
        Err(e) => println!("Could not send email: {:?}", e),
    }

    Ok(HttpResponse::Ok().body("forgot password"))
}
