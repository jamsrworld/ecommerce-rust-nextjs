use serde::Serialize;
use utoipa::ToSchema;

use crate::models::RelationProductItem;

#[derive(Debug, Serialize, ToSchema)]
pub struct OrderWithProduct {
    pub order: entity::order::Model,
    pub product: RelationProductItem,
}
