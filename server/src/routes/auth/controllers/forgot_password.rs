use super::schema::ForgotPassword;
use super::utils::generate_otp;
use super::AuthMessage;
use crate::error::ResponseWithMessage;
use crate::extractors::validator::ValidatedJson;
use crate::services::mailer::Mailer;
use crate::{error::HttpError, AppState};
use actix_web::{post, web, HttpResponse};
use askama::Template;
use entity::sea_orm_active_enums::OtpPurpose;
use sea_orm::{ColumnTrait, EntityTrait, QueryFilter};

#[derive(Template)]
#[template(path = "reset-password/verification.jinja")]
struct VerificationEmail<'a> {
    username: &'a str,
    otp: u16,
    heading: &'a str,
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
    app_data: web::Data<AppState>,
    input: ValidatedJson<ForgotPassword>,
) -> Result<HttpResponse, HttpError> {
    let ForgotPassword { email } = &input.into_inner();
    let db = &app_data.db;

    // check if email is registered
    let user = entity::user::Entity::find()
        .filter(entity::user::Column::Email.eq(email))
        .one(db)
        .await?
        .ok_or_else(|| HttpError::bad_request(AuthMessage::UserNotFound(email)))?;

    // send email
    let otp = generate_otp(db, email.to_owned(), OtpPurpose::ResetPassword).await?;
    let heading = "Reset Password";
    let subject = "Reset Password";
    let username = user.username;

    let template = VerificationEmail {
        username: username.as_str(),
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
        message: AuthMessage::OtpSentSuccessfully,
    };
    return Ok(HttpResponse::Ok().json(message));
}
