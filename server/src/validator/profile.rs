use serde::Deserialize;
use utoipa::ToSchema;
use validator::Validate;

#[derive(Debug, Deserialize, ToSchema, Validate)]
pub struct UpdateProfile {
    #[validate(length(min = 1, message = "Full name is required"))]
    pub full_name: String,
}
