use sea_orm_migration::{ prelude::*, schema::* };

use crate::{
    m20220101_000001_create_user::User,
    m20241021_041026_product::Product,
    utils::{ pg_id, pg_primary_id, timestampz_default },
};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // create cart table
        manager.create_table(
            Table::create()
                .table(Cart::Table)
                .if_not_exists()
                .col(pg_primary_id(Cart::Id))
                .col(pg_id(Cart::ProductId))
                .col(pg_id(Cart::UserId))
                .col(small_integer(Cart::Quantity))
                .col(timestampz_default(Cart::CreatedAt))
                .foreign_key(
                    ForeignKey::create()
                        .name("fk-cart_product")
                        .from(Cart::Table, Cart::ProductId)
                        .to(Product::Table, Product::Id)
                        .on_delete(ForeignKeyAction::Cascade)
                )
                .foreign_key(
                    ForeignKey::create()
                        .name("fk-cart_user")
                        .from(Cart::Table, Cart::UserId)
                        .to(User::Table, User::Id)
                        .on_delete(ForeignKeyAction::Cascade)
                )
                .to_owned()
        ).await?;

        // create unique index
        manager.create_index(
            Index::create()
                .name("cart_unique")
                .table(Cart::Table)
                .col(Cart::ProductId)
                .col(Cart::UserId)
                .unique()
                .to_owned()
        ).await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // drop cart table
        manager.drop_table(Table::drop().table(Cart::Table).to_owned()).await
    }
}

#[derive(DeriveIden)]
enum Cart {
    Table,
    Id,
    UserId,
    ProductId,
    Quantity,
    CreatedAt,
}
