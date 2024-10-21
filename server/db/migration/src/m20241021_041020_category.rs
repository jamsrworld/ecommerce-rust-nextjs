use sea_orm_migration::{ prelude::*, schema::* };

use crate::utils::pg_primary_id;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // create category table
        manager.create_table(
            Table::create()
                .table(Category::Table)
                .if_not_exists()
                .col(pg_primary_id(Category::Id))
                .col(string(Category::Title))
                .col(string(Category::Category))
                .to_owned()
        ).await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // drop category table
        manager.drop_table(Table::drop().table(Category::Table).to_owned()).await
    }
}

#[derive(DeriveIden)]
enum Category {
    Table,
    Id,
    Title,
    Category,
}
