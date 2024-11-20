use serde::Deserialize;
use utoipa::{ IntoParams, ToSchema };
use validator::Validate;

#[derive(Debug, IntoParams, ToSchema, Deserialize, Validate)]
pub struct PaginationQuery {
    #[validate(range(min = 1))]
    pub page: Option<u32>,
    #[validate(range(min = 1, max = 50))]
    pub page_size: Option<u32>,
}
