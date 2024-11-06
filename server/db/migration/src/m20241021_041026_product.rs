use extension::postgres::Type;
use sea_orm::{ EnumIter, Iterable };
use sea_orm_migration::{ prelude::*, schema::* };
use crate::utils::{ pg_primary_id, timestampz_default };

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // crate product_status type
        manager.create_type(
            Type::create().as_enum(ProductStatusEnum).values(ProductStatus::iter()).to_owned()
        ).await?;

        // create product table
        manager.create_table(
            Table::create()
                .table(Product::Table)
                .if_not_exists()
                .col(pg_primary_id(Product::Id))
                .col(string_len(Product::Title, 100))
                .col(string_len(Product::Slug, 100))
                .col(json_binary(Product::Description))
                .col(string_len(Product::Category, 100))
                .col(string_len(Product::Brand, 100))
                .col(string_len(Product::Color, 100))
                .col(string_len(Product::Size, 100))
                .col(string_len(Product::Style, 100))
                .col(json(Product::Highlights))
                .col(json(Product::Images))
                .col(boolean(Product::IsReturnable))
                .col(integer(Product::MaximumOrder))
                .col(integer(Product::MinimumOrder))
                .col(decimal_len(Product::Mrp, 12, 2))
                .col(decimal_len(Product::Price, 12, 2))
                .col(json_binary(Product::Seo))
                .col(string_len(Product::SkuID, 100))
                .col(enumeration(Product::Status, ProductStatusEnum, ProductStatus::iter()))
                .col(integer(Product::Stock))
                .col(array(Product::Tags, ColumnType::string(Some(100))))
                .col(json_binary(Product::Video))
                .col(timestampz_default(Product::CreatedAt))
                .col(timestampz_default(Product::UpdatedAt))
                .to_owned()
        ).await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // drop product table
        manager.drop_table(Table::drop().table(Product::Table).to_owned()).await?;

        // drop product_status type
        manager.drop_type(Type::drop().name(ProductStatusEnum).to_owned()).await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Product {
    Brand,
    Category,
    CreatedAt,
    Description,
    Color,
    Size,
    Style,
    Highlights,
    Id,
    Images,
    IsReturnable,
    MaximumOrder,
    MinimumOrder,
    Mrp,
    Price,
    Seo,
    SkuID,
    Slug,
    Status,
    Stock,
    Table,
    Tags,
    Title,
    UpdatedAt,
    Video,
}

#[derive(DeriveIden)]
#[sea_orm(iden = "product_status")]
struct ProductStatusEnum;

#[derive(Iden, EnumIter)]
pub enum ProductStatus {
    #[iden = "Public"]
    Public,
    #[iden = "Private"]
    Private,
    #[iden = "Unlisted"]
    Unlisted,
}
