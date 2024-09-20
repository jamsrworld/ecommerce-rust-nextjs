use super::AuthMessage;
use crate::{
    error::{HttpError, ResponseWithMessage},
    extractors::validator::ValidatedJson,
    utils::{cookie::create_cookie, jwt::create_token, password::verify_password},
    validator::auth::Login,
    AppState,
};
use actix_web::{post, web, HttpResponse};
use entity::user::Entity;
use sea_orm::EntityTrait;

/// Login
///
/// Api to login for user
#[utoipa::path(
  tag = "Auth",
  context_path = "/auth",
  request_body(content = Login),
  responses( (status=200, body = ResponseWithMessage, example = json!({"message":"Login Successful"})) )
)
]
#[post("/login")]
pub async fn login(
    app_data: web::Data<AppState>,
    input: ValidatedJson<Login>,
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let Login { email, password } = input.0;

    // check if user exist
    let user = Entity::find()
        .one(db)
        .await
        .map_err(|_| HttpError::bad_request(AuthMessage::UserNotFound(email.clone()).to_string()))?
        .ok_or(HttpError::bad_request(
            AuthMessage::UserNotFound(email.clone()).to_string(),
        ))?;
    dbg!(&user);

    // validate password
    if user.password.is_some() {
        verify_password(user.password.unwrap(), password)
            .map_err(|e| HttpError::bad_request(e.to_string()))?;
    }

    // create login token
    let jwt = create_token(email.to_owned()).map_err(|e| HttpError::server_error(e.to_string()))?;

    // create session cookie
    let cookie = create_cookie("x-session", jwt);

    // send response with cookie
    let response = ResponseWithMessage {
        message: AuthMessage::LoginSuccessful.to_string(),
    };
    Ok(HttpResponse::Ok().cookie(cookie).json(response))
}
