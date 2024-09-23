use super::schema::{Register, RegisterVerify};
use super::utils::{check_unique_email, check_unique_username};
use super::AuthMessage;
use crate::error::ResponseWithMessage;
use crate::services::mailer::Mailer;
use crate::{
    error::HttpError, extractors::validator::ValidatedJson, routes::auth::utils::verify_otp,
    utils::password::hash_password, AppState,
};
use actix_web::{post, web, HttpResponse};
use askama::Template;
use entity::sea_orm_active_enums::{OtpPurpose, UserRole, UserStatus};
use sea_orm::{ActiveModelTrait, ActiveValue::NotSet, Set};

#[derive(Template)]
#[template(path = "register/success.jinja")]
struct SuccessEmail<'a> {
    username: &'a str,
    heading: &'a str,
}

/// Register
#[utoipa::path(
tag = "Auth", 
context_path = "/auth",
request_body(content = RegisterVerify),
responses( (status=200, body = Response) )
)
]
#[post("/register/verify")]
pub async fn register_verify(
    app_data: web::Data<AppState>,
    input: ValidatedJson<RegisterVerify>,
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    // let RegisterVerify { code, register } = input.into_inner();

    let RegisterVerify { code, register } = input.into_inner();
    let Register {
        full_name,
        username,
        email,
        password,
        ..
    } = register;

    // check unique username
    check_unique_username(db, &username).await?;

    // check unique email
    check_unique_email(db, &email).await?;

    // verify otp
    verify_otp(db, &email, OtpPurpose::Register, code).await?;

    // hash password
    let hashed_password = hash_password(password)?;

    // create user
    let new_user = entity::user::ActiveModel {
        id: Set(cuid2::create_id()),
        email: Set(email.clone()),
        full_name: Set(full_name),
        username: Set(username.clone()),
        password: Set(Some(hashed_password)),
        status: Set(UserStatus::Active),
        role: Set(UserRole::User),
        created_at: NotSet,
        updated_at: NotSet,
    };
    new_user.insert(db).await?;

    // send success email
    let heading = "Registration Success";
    let subject = "Registration Success";
    let template: SuccessEmail<'_> = SuccessEmail {
        username: username.as_str(),
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
        message: AuthMessage::RegisterSuccess,
    };

    Ok(HttpResponse::Ok().json(response))
}
