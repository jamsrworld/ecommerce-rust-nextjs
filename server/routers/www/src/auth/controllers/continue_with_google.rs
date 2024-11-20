use actix_web::{ post, web, HttpResponse };
use config::session_keys::SessionKey;
use entity::sea_orm_active_enums::{ UserRole, UserStatus };
use reqwest::{ Client, Url };
use sea_orm::{
    ActiveValue::NotSet,
    ColumnTrait,
    DatabaseConnection,
    EntityTrait,
    QueryFilter,
    Set,
    ActiveModelTrait,
};
use serde::{ Deserialize, Serialize };
use utils::{
    cookie::create_cookie,
    db::create_primary_id,
    error::{ HttpError, ResponseWithMessage },
    jwt::create_token,
    AppState,
};
use validator::Validate;
use crate::{
    auth::schema::{ ContinueWithGoogleInput, GoogleLoginWithCode, GoogleLoginWithCredential },
    messages::Messages,
};

/// Continue with google
///
/// Api to login or register with google
#[utoipa::path(
    tag = "Auth",
    context_path = "/auth",
    request_body(content = ContinueWithGoogleInput),
    responses(
        (status = StatusCode::OK, body = ResponseWithMessage),
        (status = StatusCode::BAD_REQUEST, body = ResponseWithMessage),
        (status = StatusCode::INTERNAL_SERVER_ERROR, body = ResponseWithMessage)
    )
)]

#[post("/continue-with-google")]
pub async fn continue_with_google(
    app_data: web::Data<AppState>,
    input: web::Json<ContinueWithGoogleInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let jwt_secret = app_data.env.jwt_secret.to_owned();
    let input = input.into_inner();
    let client_id = app_data.env.google_client_id.to_owned();
    let client_secret = app_data.env.google_client_secret.to_owned();

    match input {
        ContinueWithGoogleInput::Code(input) => {
            input.validate().map_err(|e| HttpError::bad_request(e.to_string()))?;
            let data = get_user_by_code(input, client_id, client_secret).await?;
            return check_user(db, jwt_secret, data).await;
        }
        ContinueWithGoogleInput::Credential(input) => {
            input.validate().map_err(|e| HttpError::bad_request(e.to_string()))?;
            let data = get_user_by_credential(input, client_id).await?;
            return check_user(db, jwt_secret, data).await;
        }
    }
}

pub fn create_session_token(id: String, jwt_secret: String) -> Result<HttpResponse, HttpError> {
    // create session token
    let jwt = create_token(id, jwt_secret)?;

    // create session cookie
    let cookie = create_cookie(SessionKey::Authorization, jwt);

    let response = ResponseWithMessage {
        message: Messages::LoginSuccessful.to_string(),
    };

    Ok(HttpResponse::Created().cookie(cookie).json(response))
}

pub async fn check_user(
    db: &DatabaseConnection,
    jwt_secret: String,
    input: GoogleUserInfo
) -> Result<HttpResponse, HttpError> {
    let GoogleUserInfo { email, name, picture } = input;

    // check if user exist
    let user = entity::user::Entity
        ::find()
        .filter(entity::user::Column::Email.eq(&email))
        .one(db).await?;

    match user {
        Some(user) => {
            return create_session_token(user.id, jwt_secret);
        }
        None => {
            // register user
            let new_user_id = create_primary_id();
            let new_user = entity::user::ActiveModel {
                id: Set(new_user_id.clone()),
                email: Set(email.clone()),
                full_name: Set(name.clone()),
                password: Set(None),
                status: Set(UserStatus::Active),
                role: Set(UserRole::User),
                created_at: NotSet,
                updated_at: NotSet,
            };
            new_user.insert(db).await?;
            return create_session_token(new_user_id, jwt_secret);
        }
    }
}

pub async fn get_user_by_code(
    input: GoogleLoginWithCode,
    client_id: String,
    client_secret: String
) -> Result<GoogleUserInfo, HttpError> {
    let authorization_code = input.authorization_code;
    let root_url = "https://oauth2.googleapis.com/token";
    let client = Client::new();

    let params = [
        ("grant_type", "authorization_code"),
        ("redirect_uri", "https://mcart.jamsrworld.com"),
        // ("redirect_uri", "http://localhost:5000"),
        ("client_id", client_id.as_str()),
        ("code", authorization_code.as_str()),
        ("client_secret", client_secret.as_str()),
    ];

    let response = client
        .post(root_url)
        .form(&params)
        .send().await
        .map_err(|e| HttpError::bad_request(e.to_string()))?;

    if response.status().is_success() {
        let oauth_response = response
            .json::<OAuthResponse>().await
            .map_err(|e| HttpError::internal_server_error(e.to_string()))?;

        let data = fetch_user_by_access_token(
            &oauth_response.access_token,
            &oauth_response.id_token
        ).await?;

        let google_user_info = GoogleUserInfo {
            email: data.email,
            name: data.name,
            picture: Some(data.picture),
        };
        return Ok(google_user_info);
    }

    let status = response.status();
    let error_body = response
        .text().await
        .unwrap_or_else(|_| "Failed to read error response body.".to_string());
    let error_message = format!(
        "Error response from Google OAuth: Status: {}, Body: {}",
        status,
        error_body
    );
    return Err(HttpError::internal_server_error(error_message));
}

pub async fn get_user_by_credential(
    input: GoogleLoginWithCredential,
    client_id: String
) -> Result<GoogleUserInfo, HttpError> {
    let credential = input.credential;
    let verify_url = format!("https://oauth2.googleapis.com/tokeninfo?id_token={}", credential);
    let client = Client::new();

    let response = client
        .get(&verify_url)
        .send().await
        .map_err(|e| HttpError::bad_request(e.to_string()))?;

    if response.status().is_success() {
        let data = response
            .json::<UserInfoByCredential>().await
            .map_err(|e| HttpError::internal_server_error(e.to_string()))?;

        // validate response aud to google_client_id
        if data.aud != client_id {
            return Err(HttpError::bad_request("Invalid client id"));
        }

        let google_user_info = GoogleUserInfo {
            email: data.email,
            name: data.name,
            picture: Some(data.picture),
        };
        return Ok(google_user_info);
    }

    let status = response.status();
    let error_body = response.text().await.unwrap_or_else(|_| "Error reading response".to_string());
    let error_message = format!(
        "Failed to verify Google ID token. Status: {}, Error: {}",
        status,
        error_body
    );
    return Err(HttpError::internal_server_error(error_message));
}

pub struct GoogleUserInfo {
    email: String,
    name: String,
    picture: Option<String>,
}

#[derive(Deserialize, Serialize)]
pub struct OAuthResponse {
    pub access_token: String,
    pub id_token: String,
}

#[derive(Debug, Deserialize, Serialize)]
struct UserInfoByCredential {
    sub: String,
    email: String,
    email_verified: String,
    name: String,
    picture: String,
    aud: String,
}

#[derive(Deserialize, Serialize)]
pub struct UserInfoByAccessToken {
    id: String,
    email: String,
    verified_email: bool,
    name: String,
    given_name: String,
    family_name: String,
    picture: String,
}

pub async fn fetch_user_by_access_token(
    access_token: &str,
    id_token: &str
) -> Result<UserInfoByAccessToken, HttpError> {
    let client = Client::new();
    let mut url = Url::parse("https://www.googleapis.com/oauth2/v1/userinfo").unwrap();
    url.query_pairs_mut().append_pair("alt", "json");
    url.query_pairs_mut().append_pair("access_token", access_token);

    let response = client
        .get(url)
        .bearer_auth(id_token)
        .send().await
        .map_err(|e|
            HttpError::internal_server_error(format!("Failed to get user info {}", e.to_string()))
        )?;

    if response.status().is_success() {
        let user_info = response
            .json::<UserInfoByAccessToken>().await
            .map_err(|e|
                HttpError::internal_server_error(
                    format!("Failed to extract body {}", e.to_string())
                )
            )?;

        return Ok(user_info);
    }

    let status = response.status();
    let error_body = response
        .text().await
        .unwrap_or_else(|_| "Failed to read error response body.".to_string());
    let error_message = format!(
        "Error response from Google OAuth: Status: {}, Body: {}",
        status,
        error_body
    );

    return Err(HttpError::internal_server_error(error_message));
}
