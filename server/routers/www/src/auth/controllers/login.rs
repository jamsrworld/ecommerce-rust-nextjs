use actix_web::{ post, web, HttpResponse };
use config::session_keys::SessionKey;
use entity::user::Entity;
use extractors::validator::ValidatedJson;
use sea_orm::{ ColumnTrait, EntityTrait, QueryFilter };
use utils::{ cookie::create_cookie, jwt::create_token, password::verify_password };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use crate::auth::schema::AuthLoginInput;
use crate::messages::Messages;

/// Login
///
/// Api to login for user
#[utoipa::path(
    tag = "Auth",
    context_path = "/auth",
    request_body(content = AuthLoginInput),
    responses(
        (status = StatusCode::OK, body = ResponseWithMessage),
        (status = StatusCode::BAD_REQUEST, body = ResponseWithMessage),
        (status = StatusCode::INTERNAL_SERVER_ERROR, body = ResponseWithMessage)
    )
)]
#[post("/login")]
pub async fn login(
    app_data: web::Data<AppState>,
    input: ValidatedJson<AuthLoginInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let jwt_secret = app_data.env.jwt_secret.to_owned();
    let AuthLoginInput { email, password } = &input.into_inner();

    // check if user exist
    let user = Entity::find()
        .filter(entity::user::Column::Email.eq(email))
        .one(db).await?
        .ok_or_else(|| HttpError::bad_request(Messages::UserNotFound(email)))?;

    // return error if account don't use password
    let hashed_password = user.password.ok_or_else(||
        HttpError::bad_request(Messages::NonPasswordAccount)
    )?;

    // validate password
    let is_password_valid = verify_password(hashed_password, password)?;
    if !is_password_valid {
        return Err(HttpError::bad_request(Messages::IncorrectPassword));
    }

    // create session token
    let jwt = create_token(user.id.to_owned(), jwt_secret)?;

    // create session cookie
    let cookie = create_cookie(SessionKey::Authorization, jwt);

    let response = ResponseWithMessage {
        message: Messages::LoginSuccessful.to_string(),
    };

    Ok(HttpResponse::Ok().cookie(cookie).json(response))
}
