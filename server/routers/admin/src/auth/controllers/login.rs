use actix_web::{ post, web, HttpResponse };
use extractors::validator::ValidatedJson;
use serde::{ Deserialize, Serialize };
use utils::{ error::{HttpError, ResponseWithMessage}, AppState };
use utoipa::ToSchema;
use validator::Validate;

#[derive(Debug, ToSchema, Serialize, Deserialize, Validate)]
#[serde(rename_all = "camelCase")]
pub struct AdminLoginInput {
    pub username: String,
    pub password: String,
    pub full_name: String,
}

#[derive(Debug, ToSchema, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AdminLoginResponse {
    pub message: String,
    pub username: String,
    pub your_name: String,
}

/// Login
///
/// Api to login for user
#[utoipa::path(
    tag = "Auth",
    context_path = "/auth",
    request_body(content = AdminLoginInput),
    responses(
        (status = StatusCode::OK, body = AdminLoginResponse),
        (status = StatusCode::BAD_REQUEST, body = ResponseWithMessage),
        (status = StatusCode::INTERNAL_SERVER_ERROR, body = ResponseWithMessage)
    )
)]
#[post("/login")]
pub async fn login(
    app_data: web::Data<AppState>,
    input: ValidatedJson<AdminLoginInput>
) -> Result<HttpResponse, HttpError> {
    let response = AdminLoginResponse {
        message: "Login Successful".to_string(),
        username: "admin".to_string(),
        your_name: "".to_string(),
    };
    Ok(HttpResponse::Ok().json(response))
}
