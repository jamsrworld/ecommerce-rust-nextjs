use extension::postgres::Type;
use sea_orm::{EnumIter, Iterable};
use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // create user_role type
        manager
            .create_type(
                Type::create()
                    .as_enum(UserRole::Enum)
                    .values(UserRole::iter())
                    .to_owned(),
            )
            .await?;

        // create user_status type
        manager
            .create_type(
                Type::create()
                    .as_enum(UserStatus::Enum)
                    .values(UserStatus::iter())
                    .to_owned(),
            )
            .await?;

        // create user table
        manager
            .create_table(
                Table::create()
                    .table(User::Table)
                    .if_not_exists()
                    .col(string_len(User::Id, 24))
                    .col(string_len_uniq(User::Username, 20))
                    .col(string_len_uniq(User::Email, 50))
                    .col(string_len(User::FullName, 30))
                    .col(string_len_null(User::Password, 20))
                    .col(enumeration(
                        User::Status,
                        Alias::new("user_status"),
                        UserStatus::iter(),
                    ))
                    .col(enumeration(
                        User::Role,
                        Alias::new("user_role"),
                        UserRole::iter(),
                    ))
                    .col(timestamp_with_time_zone(User::CreatedAt))
                    .col(timestamp_with_time_zone(User::UpdatedAt))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // drop user table
        manager
            .drop_table(Table::drop().table(User::Table).to_owned())
            .await?;

        // drop type user_role
        manager
            .drop_type(Type::drop().name(UserRole::Enum).to_owned())
            .await?;

        // drop type user_status
        manager
            .drop_type(Type::drop().name(UserStatus::Enum).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum User {
    Table,
    Id,
    FullName,
    Username,
    Email,
    Password,
    Status,
    Role,
    CreatedAt,
    UpdatedAt,
}

#[derive(DeriveIden, EnumIter)]
pub enum UserStatus {
    #[sea_orm(iden = "user_status")]
    Enum,
    #[sea_orm(iden = "Active")]
    Active,
    #[sea_orm(iden = "Blocked")]
    Blocked,
}

#[derive(DeriveIden, EnumIter)]
pub enum UserRole {
    #[sea_orm(iden = "user_role")]
    Enum,
    #[sea_orm(iden = "User")]
    User,
    #[sea_orm(iden = "Admin")]
    Admin,
}
