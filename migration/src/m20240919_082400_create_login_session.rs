use sea_orm_migration::{prelude::*, schema::*};

use crate::{
    m20220101_000001_create_user::User,
    utils::{pg_id, pg_primary_id},
};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // create login_session table
        manager
            .create_table(
                Table::create()
                    .table(LoginSession::Table)
                    .if_not_exists()
                    .col(pg_primary_id(LoginSession::Id))
                    .col(pg_id(LoginSession::UserId))
                    .col(string(LoginSession::Token))
                    .col(string_len_null(LoginSession::Ip, 50))
                    .col(string_len_null(LoginSession::Country, 50))
                    .col(string_len_null(LoginSession::City, 50))
                    .col(string_len_null(LoginSession::Region, 50))
                    .col(string_len_null(LoginSession::Browser, 50))
                    .col(string_len_null(LoginSession::Os, 50))
                    .col(boolean(LoginSession::IsActive))
                    .col(string(LoginSession::Role))
                    .col(boolean(LoginSession::IsLoginAsClient))
                    .col(
                        timestamp_with_time_zone(LoginSession::CreatedAt)
                            .default(SimpleExpr::Keyword(Keyword::CurrentTimestamp)),
                    )
                    .col(timestamp_with_time_zone(LoginSession::ValidTill))
                    .foreign_key(
                        ForeignKey::create()
                            .name("fk-post_user")
                            .from(LoginSession::Table, LoginSession::UserId)
                            .to(User::Table, User::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // drop login_session table
        manager
            .drop_table(Table::drop().table(LoginSession::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum LoginSession {
    Table,
    Id,
    UserId,
    Token,
    Ip,
    Country,
    City,
    Region,
    Browser,
    Os,
    IsActive,
    Role,
    IsLoginAsClient,
    CreatedAt,
    ValidTill,
}
