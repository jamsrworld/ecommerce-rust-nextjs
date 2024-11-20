use serde::{ Deserialize, Serialize };
use utoipa::ToSchema;
use validator::Validate;

#[derive(Debug, Deserialize, Serialize, ToSchema, Validate)]
#[serde(rename_all = "camelCase")]
pub struct ChangePasswordInput {
    #[validate(length(min = 1, message = "Current Password is required"))]
    pub current_password: String,
    #[validate(length(min = 1, message = "New Password is required"))]
    pub new_password: String,
    #[validate(
        length(min = 1, message = "Confirm Password is required"),
        must_match(other = "new_password", message = "Passwords are not matching")
    )]
    pub confirm_password: String,
}
