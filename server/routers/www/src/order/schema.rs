use serde::{ Deserialize, Serialize };
use utoipa::ToSchema;

use crate::models::RelationProductItem;

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct OrderWithProduct {
    pub order: entity::order::Model,
    pub product: RelationProductItem,
}

#[derive(Debug, Serialize, Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct OrderWithPagination {
    pub orders: Vec<OrderWithProduct>,
    pub total_records: u64,
}
