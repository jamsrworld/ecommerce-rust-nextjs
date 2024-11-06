//! `SeaORM` Entity, @generated by sea-orm-codegen 1.0.1

use super::sea_orm_active_enums::ProductStatus;
use sea_orm::{ entity::prelude::*, FromJsonQueryResult };
use serde::{ Deserialize, Serialize };
use utoipa::ToSchema;
use validator::Validate;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Eq, Serialize, Deserialize, ToSchema)]
#[sea_orm(table_name = "product")]
#[serde(rename_all = "camelCase")]
#[schema(as = Product)]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: String,
    pub title: String,
    pub slug: String,
    #[sea_orm(column_type = "JsonBinary")]
    pub description: Json,
    pub category: String,
    pub brand: String,
    pub color: String,
    pub size: String,
    pub style: String,
    pub highlights: ProductHighlights,
    pub images: ProductImages,
    pub is_returnable: bool,
    pub maximum_order: i32,
    pub minimum_order: i32,
    #[sea_orm(column_type = "Decimal(Some((12, 2)))")]
    pub mrp: Decimal,
    #[sea_orm(column_type = "Decimal(Some((12, 2)))")]
    pub price: Decimal,
    #[sea_orm(column_type = "JsonBinary")]
    pub seo: ProductSeo,
    pub sku_id: String,
    pub status: ProductStatus,
    pub stock: i32,
    pub tags: Vec<String>,
    #[sea_orm(column_type = "JsonBinary")]
    pub video: ProductVideo,
    pub created_at: chrono::DateTime<chrono::FixedOffset>,
    pub updated_at: chrono::DateTime<chrono::FixedOffset>,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, FromJsonQueryResult, ToSchema)]
pub struct ProductImages(pub Vec<Image>);

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize, FromJsonQueryResult, ToSchema)]
pub struct ProductHighlights(pub Vec<ProductHighlight>);

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize, ToSchema, Validate)]
pub struct ProductHighlight {
    highlight: String,
    description: String,
}

#[derive(
    Debug,
    Deserialize,
    Serialize,
    Clone,
    PartialEq,
    Eq,
    ToSchema,
    FromJsonQueryResult,
    Validate
)]
pub struct Image {
    name: String,
    url: String,
    placeholder: String,
    width: i32,
    height: i32,
}

#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    Serialize,
    Deserialize,
    FromJsonQueryResult,
    ToSchema,
    Validate
)]
pub struct ProductVideo {
    url: String,
    thumbnail: Image,
}

#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    Serialize,
    Deserialize,
    FromJsonQueryResult,
    ToSchema,
    Validate
)]
pub struct ProductSeo {
    title: String,
    description: String,
    keywords: Vec<String>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
