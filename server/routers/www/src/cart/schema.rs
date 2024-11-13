use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use validator::Validate;

#[derive(Debug, Deserialize, Validate, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct CartUpdateQuantityInput {
    #[validate(range(min = 1, max = 1000))]
    pub quantity: i16,
}

#[derive(Debug, Deserialize, ToSchema, Serialize)]
pub struct CartItemWithMessage {
    pub data: entity::cart::Model,
    pub message: String,
}
