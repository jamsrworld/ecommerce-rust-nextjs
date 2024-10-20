use serde::{Deserialize, Serialize};
use utoipa::ToSchema;
use validator::Validate;

#[derive(Debug, ToSchema, Validate, Deserialize, Serialize)]
pub struct AttributeValue {
    #[validate(
        length(min = 1, message = "Value is required"),
        length(max = 50, message = "Maximum 50 characters are allowed")
    )]
    #[schema(min_length = 1, max_length = 50)]
    pub value: String,
}

#[derive(Debug, ToSchema, Validate, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateAttributeInput {
    #[validate(
        length(min = 1, message = "Name is required"),
        length(max = 50, message = "Maximum 50 characters are allowed")
    )]
    #[schema(example = "Color", min_length = 1, max_length = 50)]
    /// Name of the attribute.
    ///
    pub name: String,

    #[validate]
    /// Values of the attribute.
    pub values: Vec<AttributeValue>,
}
