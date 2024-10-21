use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use validator::Validate;

#[derive(Debug, ToSchema, Validate, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateProductInput {
    #[validate(
        length(min = 1, message = "Title is required"),
        length(max = 50, message = "Maximum 50 characters are allowed")
    )]
    #[schema(example = "Color", min_length = 1, max_length = 50)]
    /// Title of the product.
    ///
    pub title: String,
}
