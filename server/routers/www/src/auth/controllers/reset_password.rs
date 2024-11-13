use utils::{ AppState, password::hash_password, error::{ HttpError, ResponseWithMessage } };
use services::mailer::Mailer;
use extractors::validator::ValidatedJson;
use actix_web::{ post, web, HttpResponse };
use askama::Template;
use entity::sea_orm_active_enums::OtpPurpose;
use sea_orm::{ ActiveModelTrait, ColumnTrait, EntityTrait, QueryFilter, Set };

use crate::auth::{messages::AuthMessage, schema::AuthResetPasswordInput, utils::{delete_otp, verify_otp}};

/// Reset Password
#[utoipa::path(
    tag = "Auth",
    context_path = "/auth",
    request_body(content = AuthResetPasswordInput),
    responses(
        (status = StatusCode::OK, body = ResponseWithMessage),
        (status = StatusCode::BAD_REQUEST, body = ResponseWithMessage),
        (status = StatusCode::INTERNAL_SERVER_ERROR, body = ResponseWithMessage)
    )
)]
#[post("/reset-password")]
pub async fn reset_password(
    app_data: web::Data<AppState>,
    input: ValidatedJson<AuthResetPasswordInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let AuthResetPasswordInput { password, email, otp, .. } = input.into_inner();

    // verify otp
    verify_otp(db, &email, OtpPurpose::ResetPassword, otp).await?;

    // hash password
    let hashed_password = hash_password(&password)?;

    // update new password of user
    let user = entity::user::Entity
        ::find()
        .filter(entity::user::Column::Email.eq(email.clone()))
        .one(db).await?
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
        message: AuthMessage::ResetPasswordSuccess.to_string(),
    };
    Ok(HttpResponse::Ok().json(response))
}

#[derive(Template)]
#[template(path = "reset-password/success.jinja")]
struct SuccessEmail<'a> {
    full_name: &'a str,
    heading: &'a str,
}
