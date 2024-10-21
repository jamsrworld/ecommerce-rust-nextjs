use sea_orm_migration::{prelude::*, schema::*};

use crate::utils::{pg_primary_id, timestampz_default};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // create attribute table
        manager
            .create_table(
                Table::create()
                    .table(Attribute::Table)
                    .if_not_exists()
                    .col(pg_primary_id(Attribute::Id))
                    .col(string_len_uniq(Attribute::Name, 50))
                    .col(string(Attribute::Values).array(ColumnType::JsonBinary))
                    .col(timestampz_default(Attribute::CreatedAt))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // drop attribute table
        manager
            .drop_table(Table::drop().table(Attribute::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Attribute {
    Table,
    Id,
    Name,
    Values,
    CreatedAt,
}
