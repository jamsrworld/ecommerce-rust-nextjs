use super::schema::AuthRegisterInput;
use super::utils::check_unique_email;
use super::AuthMessage;
use utils::{AppState, error::{HttpError, ResponseWithMessage}};
use extractors::validator::ValidatedJson;
use super::utils::generate_otp;
use services::mailer::Mailer;
use actix_web::{post, web, HttpResponse};
use askama::Template;
use entity::sea_orm_active_enums::OtpPurpose;

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
  request_body(content = AuthRegisterInput),
  responses( 
    (status=StatusCode::CREATED, body = ResponseWithMessage),
    (status=StatusCode::CONFLICT, body = ResponseWithMessage),
    (status=StatusCode::BAD_REQUEST, body = ResponseWithMessage),
    (status=StatusCode::INTERNAL_SERVER_ERROR, body = ResponseWithMessage),
  )
)
]
#[post("/register")]
pub async fn register(
    app_data: web::Data<AppState>,
    input: ValidatedJson<AuthRegisterInput>,
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let AuthRegisterInput { email, .. } = &input.into_inner();

    // check unique email
    check_unique_email(db, email).await?;

    // send email
    let otp = generate_otp(db, email.to_owned(), OtpPurpose::Register).await?;
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
        message: AuthMessage::OtpSentSuccessfully.to_string(),
    };
    return Ok(HttpResponse::Ok().json(message));
}
