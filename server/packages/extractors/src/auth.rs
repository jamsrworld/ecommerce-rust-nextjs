use std::ops::Deref;

use actix_web::{error::ErrorUnauthorized, FromRequest, HttpMessage};
use entity::user;
use futures_util::future::{ready, Ready};
use serde::{Deserialize, Serialize};
use utils::error::HttpError;

#[derive(Debug, Serialize, Deserialize)]
pub struct Authenticated(user::Model);

impl FromRequest for Authenticated {
    type Error = actix_web::Error;
    type Future = Ready<Result<Self, Self::Error>>;

    fn from_request(
        req: &actix_web::HttpRequest,
        _payload: &mut actix_web::dev::Payload,
    ) -> Self::Future {
        let value = req.extensions().get::<user::Model>().cloned();
        let result = match value {
            Some(user) => Ok(Authenticated(user)),
            None => Err(ErrorUnauthorized(HttpError::unauthorized(
                "Authentication required",
            ))),
        };
        ready(result)
    }
}

impl Deref for Authenticated {
    type Target = user::Model;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
