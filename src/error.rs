use actix_web::{http::StatusCode, ResponseError};
use log::error;
use sea_orm::DbErr;
use serde::Serialize;
use utoipa::ToSchema;

#[derive(Debug, thiserror::Error)]
pub enum ErrorMessage {
    #[error("An error occurred during password hashing")]
    HashingError,
}

impl Into<String> for ErrorMessage {
    fn into(self) -> String {
        self.to_string()
    }
}

#[derive(Debug)]
pub struct HttpError {
    message: String,
    status_code: StatusCode,
}

impl From<DbErr> for HttpError {
    fn from(value: DbErr) -> Self {
        Self {
            message: value.to_string(),
            status_code: StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

impl From<argon2::password_hash::Error> for HttpError {
    fn from(value: argon2::password_hash::Error) -> Self {
        Self {
            message: value.to_string(),
            status_code: StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

impl From<jsonwebtoken::errors::Error> for HttpError {
    fn from(value: jsonwebtoken::errors::Error) -> Self {
        Self {
            message: value.to_string(),
            status_code: StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

impl HttpError {
    pub fn new(message: impl Into<String>, status: StatusCode) -> Self {
        let message: String = message.into();
        error!("{}", message);
        Self {
            message,
            status_code: status,
        }
    }

    pub fn server_error(message: impl Into<String>) -> Self {
        Self::new(message, StatusCode::INTERNAL_SERVER_ERROR)
    }

    pub fn not_found(message: impl Into<String>) -> Self {
        Self::new(message, StatusCode::NOT_FOUND)
    }

    pub fn bad_request(message: impl Into<String>) -> Self {
        Self::new(message, StatusCode::BAD_REQUEST)
    }

    pub fn unauthorized(message: impl Into<String>) -> Self {
        Self::new(message, StatusCode::UNAUTHORIZED)
    }

    pub fn forbidden(message: impl Into<String>) -> Self {
        Self::new(message, StatusCode::FORBIDDEN)
    }

    pub fn conflict(message: impl Into<String>) -> Self {
        Self::new(message, StatusCode::CONFLICT)
    }

    pub fn internal_server_error(message: impl Into<String>) -> Self {
        Self::new(message, StatusCode::INTERNAL_SERVER_ERROR)
    }

    pub fn precondition_failed(message: impl Into<String>) -> Self {
        Self::new(message, StatusCode::PRECONDITION_FAILED)
    }

}

impl std::fmt::Display for HttpError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.message)
    }
}

#[derive(Serialize, ToSchema)]
pub struct ResponseWithMessage<T: Into<String>> {
    pub message: T,
}

impl ResponseError for HttpError {
    fn status_code(&self) -> StatusCode {
        self.status_code
    }

    fn error_response(&self) -> actix_web::HttpResponse<actix_web::body::BoxBody> {
        actix_web::HttpResponse::build(self.status_code).json(ResponseWithMessage {
            message: self.message.to_string(),
        })
    }
}
