use super::schema::{AuthRegisterInput, AuthRegisterVerifyInput};
use super::utils::check_unique_email;
use super::AuthMessage;
use crate::config::session_keys::SessionKey;
use crate::error::ResponseWithMessage;
use crate::services::mailer::Mailer;
use crate::utils::cookie::create_cookie;
use crate::utils::jwt::create_token;
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
request_body(content = AuthRegisterVerifyInput),
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
    input: ValidatedJson<AuthRegisterVerifyInput>,
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    // let RegisterVerify { code, register } = input.into_inner();

    let AuthRegisterVerifyInput { code, register } = input.into_inner();
    let AuthRegisterInput {
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
    let new_user_id  = cuid2::create_id();
    let new_user = entity::user::ActiveModel {
        id: Set(new_user_id.clone()),
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
    let template = SuccessEmail {
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

     // create session token
     let jwt = create_token(new_user_id)?;

    // create session cookie
    let cookie = create_cookie(SessionKey::Authorization, jwt);

    let response = ResponseWithMessage {
        message: AuthMessage::RegisterSuccess.to_string(),
    };

    Ok(HttpResponse::Ok().cookie(cookie).json(response))
}
