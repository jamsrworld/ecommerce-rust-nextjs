use config::session_keys::SessionKey;
use utils::{ db::create_primary_id, error::{ HttpError, ResponseWithMessage } };
use services::mailer::Mailer;
use extractors::validator::ValidatedJson;
use utils::{ password::hash_password, AppState, jwt::create_token, cookie::create_cookie };
use actix_web::{ post, web, HttpResponse };
use askama::Template;
use entity::sea_orm_active_enums::{ OtpPurpose, UserRole, UserStatus };
use sea_orm::{ ActiveModelTrait, ActiveValue::NotSet, Set };
use crate::{
    auth::{
        schema::{ AuthRegisterInput, AuthRegisterVerifyInput },
        utils::{ check_unique_email, verify_otp },
    },
    messages::Messages,
};

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
        (status = StatusCode::OK, body = ResponseWithMessage),
        (status = StatusCode::CONFLICT, body = ResponseWithMessage),
        (status = StatusCode::BAD_REQUEST, body = ResponseWithMessage),
        (status = StatusCode::INTERNAL_SERVER_ERROR, body = ResponseWithMessage)
    )
)]
#[post("/register/verify")]
pub async fn register_verify(
    app_data: web::Data<AppState>,
    input: ValidatedJson<AuthRegisterVerifyInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let jwt_secret = app_data.env.jwt_secret.to_owned();
    let app_server_url = app_data.env.app_server_url.to_owned();

    let AuthRegisterVerifyInput { code, register } = input.into_inner();
    let AuthRegisterInput { full_name, email, password, .. } = register;

    // check unique email
    check_unique_email(db, &email).await?;

    // verify otp
    verify_otp(db, &email, OtpPurpose::Register, code).await?;

    // hash password
    let hashed_password = hash_password(password)?;

    // create user
    let new_user_id = create_primary_id();
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
    let session_token = create_token(new_user_id, jwt_secret)?;

    // create session cookie
    let cookie = create_cookie(SessionKey::Authorization, session_token, app_server_url);

    let response = ResponseWithMessage {
        message: Messages::RegisterSuccess.to_string(),
    };

    Ok(HttpResponse::Created().cookie(cookie).json(response))
}
