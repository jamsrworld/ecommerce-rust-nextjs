use super::schema::ResetPassword;
use super::utils::{delete_otp, verify_otp};
use super::AuthMessage;
use crate::{
    error::{HttpError, ResponseWithMessage},
    extractors::validator::ValidatedJson,
    services::mailer::Mailer,
    utils::password::hash_password,
    AppState,
};
use actix_web::{post, web, HttpResponse};
use askama::Template;
use entity::sea_orm_active_enums::OtpPurpose;
use sea_orm::{ActiveModelTrait, ColumnTrait, EntityTrait, QueryFilter, Set};

#[derive(Template)]
#[template(path = "reset-password/success.jinja")]
struct SuccessEmail<'a> {
    full_name: &'a str,
    heading: &'a str,
}

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
    app_data: web::Data<AppState>,
    input: ValidatedJson<ResetPassword>,
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let ResetPassword {
        password,
        email,
        otp,
        ..
    } = input.into_inner();

    // verify otp
    verify_otp(db, &email, OtpPurpose::ResetPassword, otp).await?;

    // hash password
    let hashed_password = hash_password(&password)?;

    // update new password of user
    let user = entity::user::Entity::find()
        .filter(entity::user::Column::Email.eq(email.clone()))
        .one(db)
        .await?
        .ok_or_else(|| HttpError::bad_request(AuthMessage::UserNotFound(&email)))?;
    let full_name = user.full_name.clone();

    let mut user: entity::user::ActiveModel = user.into();
    user.password = Set(Some(hashed_password.clone()));
    user.update(db).await?;

    // delete otp
    delete_otp(db, &email, otp).await?;

    // send success email
    let heading = "Reset Password Success";
    let subject = "Reset Password Success";
    let template: SuccessEmail<'_> = SuccessEmail {
        full_name: full_name.as_str(),
        heading,
    };
    let body = &Mailer::render_template(&template)?;
    let mailer = Mailer {
        body,
        email: email.as_str(),
        subject,
    };
    mailer.send()?;

    let response = ResponseWithMessage {
        message: AuthMessage::ResetPasswordSuccess,
    };
    Ok(HttpResponse::Ok().json(response))
}
