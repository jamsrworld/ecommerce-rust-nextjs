use entity::{
    product::{ ProductHighlights, ProductImages, ProductSeo, ProductVideo },
    sea_orm_active_enums::ProductStatus,
};
use sea_orm::prelude::Decimal;
use serde::{ Deserialize, Serialize };
use utoipa::ToSchema;
use validator::Validate;

#[derive(Debug, ToSchema, Validate, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CreateProductInput {
    #[validate(
        length(min = 1, message = "Title is required"),
        length(max = 200, message = "Maximum 200 characters are allowed")
    )]
    #[schema(example = "Color", min_length = 1, max_length = 50)]
    /// Title of the product.
    ///
    pub title: String,
    pub description: serde_json::Value,
    #[validate(length(min = 1, message = "Category is required"))]
    pub category: String,
    #[validate(length(min = 1, message = "Brand is required"))]
    pub brand: String,
    #[validate(length(min = 1, message = "Color is required"))]
    pub color: String,
    #[validate(length(min = 1, message = "Size is required"))]
    pub size: String,
    #[validate(length(min = 1, message = "Style is required"))]
    pub style: String,
    pub highlights: ProductHighlights,
    pub images: ProductImages,
    pub is_returnable: bool,
    pub maximum_order: i32,
    pub minimum_order: i32,
    pub mrp: Decimal,
    pub price: Decimal,
    pub seo: ProductSeo,
    #[validate(length(min = 1, message = "SKU ID is required"))]
    pub sku_id: String,
    pub stock: i32,
    pub tags: Vec<String>,
    pub video: ProductVideo,
    pub status: ProductStatus,
}

#[derive(Debug, ToSchema, Serialize)]
pub struct ProductWithMessage {
    pub message: String,
    pub data: entity::product::Model,
}
