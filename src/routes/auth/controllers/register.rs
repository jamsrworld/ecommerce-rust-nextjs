use super::utils::{check_unique_email, check_unique_username};
use crate::{
    error::{HttpError, ResponseWithMessage},
    extractors::validator::ValidatedJson,
    services::mailer::Mailer,
    utils::number::generate_otp,
    validator::auth::Register,
    AppState,
};
use actix_web::{post, web, HttpResponse};
use askama::Template;

#[derive(Template)]
#[template(path = "register/verification.jinja")]
struct VerificationEmail<'a> {
    email: &'a str,
    otp: u16,
    heading: &'a str,
}

/// Register
#[utoipa::path(
  tag = "Auth", 
  context_path = "/auth",
  request_body(content = Register),
  responses( (status=200, body = Response) )
)
]
#[post("/register")]
pub async fn register(
    app_data: web::Data<AppState>,
    input: ValidatedJson<Register>,
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let Register {
        email, username, ..
    } = &input.into_inner();

    // check unique username
    check_unique_username(db, username).await?;

    // check unique email
    check_unique_email(db, email).await?;

    // send email
    let otp = generate_otp();
    let heading = "Registration Verification";
    let subject = "Registration Verification";

    let template = VerificationEmail {
        email,
        otp,
        heading,
    };
    let body = &Mailer::render_template(&template)?;
    let mailer = Mailer {
        body,
        email,
        subject,
    };
    mailer.send()?;

    // send response
    let message = ResponseWithMessage {
        message: "Otp has been sent to your email",
    };
    return Ok(HttpResponse::Ok().json(message));
}
