use crate::error::HttpError;
use actix_web::{web::Json, FromRequest};
use serde::{de::DeserializeOwned, Deserialize, Serialize};
use std::{future::Future, pin::Pin};
use validator::Validate;

#[derive(Debug, Serialize, Deserialize)]
pub struct ValidatedJson<T>(pub T);
impl<T> ValidatedJson<T> {
    pub fn into_inner(self) -> T {
        self.0
    }
}

impl<T> FromRequest for ValidatedJson<T>
where
    T: DeserializeOwned + Validate + 'static,
{
    type Error = HttpError;
    type Future = Pin<Box<dyn Future<Output = Result<Self, Self::Error>>>>;

    fn from_request(
        req: &actix_web::HttpRequest,
        payload: &mut actix_web::dev::Payload,
    ) -> Self::Future {
        let fut = Json::<T>::from_request(req, payload);

        Box::pin(async move {
            let value = fut
                .await
                .map_err(|err| HttpError::internal_server_error(err.to_string()))?;
            value.validate().map_err(|err| {
                let error = err.to_string();
                HttpError::bad_request(error)
            })?;
            Ok(ValidatedJson(value.into_inner()))
        })
    }
}
