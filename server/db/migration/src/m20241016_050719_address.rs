use sea_orm_migration::{prelude::*, schema::*};

use crate::{m20220101_000001_create_user::User, utils::{pg_id, pg_primary_id}};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // create address table
        manager
            .create_table(
                Table::create()
                    .table(Address::Table)
                    .if_not_exists()
                    .col(pg_primary_id(Address::Id))
                    .col(pg_id(Address::UserId))
                    .col(string_len(Address::FirstName, 20))
                    .col(string_len(Address::LastName, 20))
                    .col(integer(Address::PostalCode))
                    .col(string_len(Address::City, 50))
                    .col(string_len(Address::State, 50))
                    .col(string_len(Address::FullAddress, 300))
                    .col(string_len(Address::PhoneNumber, 15))
                    .col(string_len_null(Address::Landmark, 200))
                    .col(boolean(Address::IsDefault))
                    .col(
                        timestamp_with_time_zone(Address::CreatedAt)
                            .default(SimpleExpr::Keyword(Keyword::CurrentTimestamp)),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-address_user")
                            .from(Address::Table, Address::UserId)
                            .to(User::Table, User::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // drop address table
        manager
            .drop_table(Table::drop().table(Address::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Address {
    Table,
    Id,
    UserId,
    FirstName,
    LastName,
    PostalCode,
    City,
    State,
    FullAddress,
    PhoneNumber,
    Landmark,
    CreatedAt,
    IsDefault,
}
