use sea_orm_migration::{ prelude::*, schema::* };

use crate::utils::pg_primary_id;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // create product table
        manager.create_table(
            Table::create()
                .table(Product::Table)
                .if_not_exists()
                .col(pg_primary_id(Product::Id))
                .col(string(Product::Title))
                .col(string(Product::Slug))
                .to_owned()
        ).await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // drop product table
        manager.drop_table(Table::drop().table(Product::Table).to_owned()).await
    }
}

#[derive(DeriveIden)]
enum Product {
    Table,
    Id,
    Title,
    Slug,
    Status,
    MinimumOrder,
    MaximumOrder,
    CreatedAt,
    UpdatedAt,
    Price,
    Mrp,
    Stock,
    LowStockWarning,
    SkuID,
    isReturnable,
    Tags,
    Seo,
    Images,
    VideoUrl,
    Description,
}
