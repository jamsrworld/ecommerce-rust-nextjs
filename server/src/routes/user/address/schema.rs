use serde::{Deserialize, Serialize};
use utoipa::{ToResponse, ToSchema};
use validator::Validate;

#[derive(Debug, Deserialize, Serialize, ToSchema, ToResponse, Validate)]
#[serde(rename_all = "camelCase")]
pub struct CreateAddressInput {
    #[validate(
        length(min = 1, message = "First name is required"),
        length(max = 20, message = "Maximum 20 characters are allowed")
    )]
    #[schema(example = "John", min_length = 1, max_length = 20)]
    /// First name of the user.
    pub first_name: String,

    #[validate(
        length(min = 1, message = "First name is required"),
        length(max = 20, message = "Maximum 20 characters are allowed")
    )]
    #[schema(example = "Doe", min_length = 1, max_length = 20)]
    /// Last name of the user.
    pub last_name: String,

    #[validate(
        length(min = 1, message = "Phone number is required"),
        length(equal = 10, message = "Phone number must be 10 digits")
    )]
    #[schema(example = "1234567890", min_length = 1, max_length = 10)]
    /// Phone number of the user.
    pub phone_number: String,

    #[validate(
        length(min = 1, message = "Full Address is required"),
        length(min = 5, message = "Full Address must be at least 5 characters long"),
        length(max = 300, message = "Maximum 300 characters are allowed")
    )]
    #[schema(min_length = 1, max_length = 300)]
    /// Address of the user.
    pub full_address: String,

    #[validate(
        length(min = 1, message = "City is required"),
        length(max = 50, message = "Maximum 50 characters are allowed")
    )]
    #[schema(min_length = 1, max_length = 50)]
    /// City of the user.
    pub city: String,

    #[validate(
        length(min = 1, message = "State is required"),
        length(max = 50, message = "Maximum 50 characters are allowed")
    )]
    #[schema(min_length = 1, max_length = 50)]
    /// State of the user.
    pub state: String,

    #[validate(range(min = 100000, max = 999999, message = "Postal code is invalid"))]
    #[schema(example = 123456, minimum = 100000, maximum = 999999)]
    /// Postal Code of the user.
    pub postal_code: i32,

    #[validate(
        length(min = 1, message = "Landmark is required"),
        length(max = 50, message = "Maximum 50 characters are allowed")
    )]
    #[schema(min_length = 1, max_length = 50)]
    /// Landmark of the user.
    pub landmark: Option<String>,
}
