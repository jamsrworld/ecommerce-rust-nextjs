use actix_web::{ post, web, HttpResponse };
use extractors::validator::ValidatedJson;
use reqwest::{ Client, Error, Url };
use serde::{ Deserialize, Serialize };
use serde_json::{ json, Value };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use super::schema::ContinueWithGoogleInput;

#[derive(Deserialize, Serialize)]
pub struct OAuthResponse {
    pub access_token: String,
    pub id_token: String,
}

#[derive(Deserialize, Serialize)]
pub struct GoogleUserResult {
    pub id: String,
    pub email: String,
    pub verified_email: bool,
    pub name: String,
    pub given_name: String,
    pub family_name: String,
    pub picture: String,
}

pub async fn get_google_user(
    access_token: &str,
    id_token: &str
) -> Result<GoogleUserResult, HttpError> {
    let client = Client::new();
    let mut url = Url::parse("https://www.googleapis.com/oauth2/v1/userinfo").unwrap();
    url.query_pairs_mut().append_pair("alt", "json");
    url.query_pairs_mut().append_pair("access_token", access_token);

    let response = client
        .get(url)
        .bearer_auth(id_token)
        .send().await
        .map_err(|e|
            HttpError::server_error(format!("Failed to get user info {}", e.to_string()))
        )?;

    if response.status().is_success() {
        // dbg!(&response.json::<Value>().await.map_err(|e| e.to_string()));
        let user_info: GoogleUserResult = response
            .json::<GoogleUserResult>().await
            .map_err(|e|
                HttpError::server_error(format!("Failed to extract body {}", e.to_string()))
            )?;

        Ok(user_info)
    } else {
        let message = "An error occurred while trying to retrieve user information.";
        Err(HttpError::server_error(message))
    }
}

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
    input: ValidatedJson<ContinueWithGoogleInput>
) -> Result<HttpResponse, HttpError> {
    let input = input.into_inner();
    let authorization_code = input.authorization_code;

    let client_id = app_data.env.google_client_id.to_owned();
    let client_secret = app_data.env.google_client_secret.to_owned();

    let root_url = "https://oauth2.googleapis.com/token";
    let client = Client::new();

    let params = [
        ("grant_type", "authorization_code"),
        ("redirect_uri", "http://localhost:5000"),
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
            .map_err(|e| HttpError::server_error(e.to_string()))?;

        let user_info = get_google_user(
            &oauth_response.access_token,
            &oauth_response.id_token
        ).await?;

        let response: serde_json::Value =
            json!({
            "oauth_response":oauth_response,
            "user_info":user_info
        });

        Ok(HttpResponse::Ok().json(response))
    } else {
        let status = response.status();
        let error_body = response
            .text().await
            .unwrap_or_else(|_| "Failed to read error response body.".to_string());

        // Log or inspect the error status and body
        let error_message = format!(
            "Error response from Google OAuth: Status: {}, Body: {}",
            status,
            error_body
        );

        Err(HttpError::internal_server_error(error_message))
    }
}
