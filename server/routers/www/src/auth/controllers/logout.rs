use utils::error::{ HttpError, ResponseWithMessage };
use actix_web::{ delete, HttpResponse };
use crate::auth::messages::AuthMessage;

/// Logout
#[utoipa::path(
    tag = "Auth",
    context_path = "/auth",
    responses(
        (status = StatusCode::OK, body = ResponseWithMessage),
        (status = StatusCode::BAD_REQUEST, body = ResponseWithMessage)
    )
)]
#[delete("/logout")]
pub async fn logout() -> Result<HttpResponse, HttpError> {
    let response = ResponseWithMessage {
        message: AuthMessage::LogoutSuccessful.to_string(),
    };
    Ok(HttpResponse::Ok().json(response))
}
