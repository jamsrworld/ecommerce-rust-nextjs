use super::schema::{AuthRegister, AuthRegisterVerify};
use super::utils::check_unique_email;
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
    full_name: &'a str,
    heading: &'a str,
}

/// Register Verification
#[utoipa::path(
tag = "Auth", 
context_path = "/auth",
request_body(content = AuthRegisterVerify),
responses( 
    (status=StatusCode::OK, body = ResponseWithMessage),
    (status=StatusCode::CONFLICT, body = ResponseWithMessage),
    (status=StatusCode::BAD_REQUEST, body = ResponseWithMessage),
    (status=StatusCode::INTERNAL_SERVER_ERROR, body = ResponseWithMessage),
)
)
]
#[post("/register/verify")]
pub async fn register_verify(
    app_data: web::Data<AppState>,
    input: ValidatedJson<AuthRegisterVerify>,
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    // let RegisterVerify { code, register } = input.into_inner();

    let AuthRegisterVerify { code, register } = input.into_inner();
    let AuthRegister {
        full_name,
        email,
        password,
        ..
    } = register;

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
        full_name: Set(full_name.clone()),
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
        message: AuthMessage::RegisterSuccess.to_string(),
    };

    Ok(HttpResponse::Ok().json(response))
}
