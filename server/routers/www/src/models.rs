use entity::product::ProductImages;
use sea_orm::prelude::Decimal;
use serde::{ Deserialize, Serialize };
use utoipa::ToSchema;

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct RelationProductItem {
    pub id: String,
    pub title: String,
    pub slug: String,
    pub brand: String,
    pub color: String,
    pub size: String,
    pub style: String,
    pub images: ProductImages,
    pub mrp: Decimal,
    pub price: Decimal,
}

impl From<entity::product::Model> for RelationProductItem {
    fn from(value: entity::product::Model) -> Self {
        RelationProductItem {
            id: value.id,
            title: value.title,
            slug: value.slug,
            brand: value.brand,
            color: value.color,
            size: value.size,
            style: value.style,
            images: value.images,
            mrp: value.mrp,
            price: value.price,
        }
    }
}
