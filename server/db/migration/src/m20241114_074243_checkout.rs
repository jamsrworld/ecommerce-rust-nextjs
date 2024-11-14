use sea_orm_migration::{ prelude::*, schema::* };

use crate::{
    m20220101_000001_create_user::User, m20241021_041026_product::Product, utils::{ pg_id, pg_primary_id, timestampz_default }
};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // create checkout table
        manager.create_table(
            Table::create()
                .table(Checkout::Table)
                .if_not_exists()
                .col(pg_primary_id(Checkout::Id))
                .col(pg_id(Checkout::UserId))
                .col(pg_id(Checkout::ProductId))
                .col(small_integer(Checkout::Quantity))
                .col(timestampz_default(Checkout::CreatedAt))
                .foreign_key(
                    ForeignKey::create()
                        .name("fk-checkout_product")
                        .from(Checkout::Table, Checkout::ProductId)
                        .to(Product::Table, Product::Id)
                        .on_delete(ForeignKeyAction::Cascade)
                )
                .foreign_key(
                    ForeignKey::create()
                        .name("fk-checkout_user")
                        .from(Checkout::Table, Checkout::UserId)
                        .to(User::Table, User::Id)
                        .on_delete(ForeignKeyAction::Cascade)
                )
                .to_owned()
        ).await?;

        // create unique index
        manager.create_index(
            Index::create()
                .name("checkout_unique")
                .table(Checkout::Table)
                .col(Checkout::ProductId)
                .col(Checkout::UserId)
                .unique()
                .to_owned()
        ).await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // drop checkout table
        manager.drop_table(Table::drop().table(Checkout::Table).to_owned()).await
    }
}

#[derive(DeriveIden)]
enum Checkout {
    Table,
    Id,
    UserId,
    ProductId,
    Quantity,
    CreatedAt,
}
