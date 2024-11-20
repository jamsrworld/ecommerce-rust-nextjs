use std::thread::spawn;

use actix_web::{ patch, web, HttpResponse };
use askama::Template;
use extractors::{ auth::Authenticated, validator::ValidatedJson };
use log::info;
use sea_orm::{ EntityTrait, Set, ActiveModelTrait };
use services::mailer::Mailer;
use utils::{
    error::{ HttpError, ResponseWithMessage },
    password::{ hash_password, verify_password },
    AppState,
};
use crate::profile::{ messages::ProfileMessage, schema::ChangePasswordInput };

/// Change Password
#[utoipa::path(
    tag = "Profile",
    context_path = "/profile",
    request_body(content = ChangePasswordInput),
    responses((status = 200, body = ResponseWithMessage))
)]
#[patch("/password")]
pub async fn change_password(
    app_data: web::Data<AppState>,
    input: ValidatedJson<ChangePasswordInput>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let input = input.into_inner();
    let user_id = user.id.to_owned();

    let ChangePasswordInput { current_password, new_password, .. } = input;

    // get user
    let user = entity::user::Entity
        ::find_by_id(&user_id)
        .one(db).await?
        .ok_or_else(|| HttpError::bad_request(ProfileMessage::UserNotFound(&user_id)))?;

    let hashed_password = user.password
        .to_owned()
        .ok_or_else(|| HttpError::bad_request(ProfileMessage::UserNotFound(&user_id)))?;

    // validate password
    let is_password_valid = verify_password(hashed_password, current_password)?;
    if !is_password_valid {
        return Err(HttpError::bad_request(ProfileMessage::IncorrectPassword));
    }

    // hash password
    let hashed_password = hash_password(new_password)?;

    // let full_name = user.full_name;
    // let email = user.email;

    let email = &user.email.to_owned();
    let full_name = &user.full_name.to_owned();

    // update password
    info!("Changing password for user: {}", user_id);
    let mut user: entity::user::ActiveModel = user.into();
    user.password = Set(Some(hashed_password));
    user.update(db).await?;
    info!("Password changed for user: {}", user_id);

    // send success email
    let heading = "Change Password Success";
    let subject = "Change Password Success";
    let template: SuccessEmail<'_> = SuccessEmail {
        full_name,
        heading,
    };
    let body = &Mailer::render_template(&template)?;
    let mailer = Mailer {
        body,
        email,
        subject,
    };
    mailer.send()?;

    let response = ResponseWithMessage {
        message: ProfileMessage::PasswordChangeSuccess.to_string(),
    };

    Ok(HttpResponse::Ok().json(response))
}

#[derive(Template)]
#[template(path = "change-password/success.jinja")]
struct SuccessEmail<'a> {
    full_name: &'a str,
    heading: &'a str,
}
