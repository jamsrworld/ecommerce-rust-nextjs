use actix_web::{http::StatusCode, ResponseError};
use jsonwebtoken::errors::Error as JwtError;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Debug, thiserror::Error)]
#[error("Authentication Error")]
pub enum HttpError {
    #[error("Incorrect Password")]
    IncorrectPassword,
    #[error("No account is registered with this email address")]
    EmailNotFound,
    #[error("Username already exist")]
    UsernameAlreadyExist,
    #[error("Email already exist")]
    EmailAlreadyExist,
    #[error("User not found")]
    UserNotFound,
    #[error("Invalid credentials")]
    InvalidCredentials,
    #[error("Invalid token")]
    InvalidToken,
}

impl From<String> for HttpError {
    fn from(_: String) -> Self {
        Self::UserNotFound // replace this with the relevant error variant
    }
}

impl From<JwtError> for HttpError {
    fn from(_: JwtError) -> Self {
        Self::InvalidToken
    }
}

#[derive(Debug, ToSchema, Serialize, Deserialize)]
pub struct ResponseWithMessage {
    pub message: String,
}

impl ResponseError for HttpError {
    fn status_code(&self) -> actix_web::http::StatusCode {
        StatusCode::BAD_REQUEST
    }

    fn error_response(&self) -> actix_web::HttpResponse<actix_web::body::BoxBody> {
        actix_web::HttpResponse::build(self.status_code()).json(ResponseWithMessage {
            message: self.to_string(),
        })
    }
}
