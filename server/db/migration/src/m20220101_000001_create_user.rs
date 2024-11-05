use crate::{
    config::{ EMAIL_LENGTH, FULL_NAME_LENGTH },
    utils::{ pg_primary_id, timestampz_default },
};
use extension::postgres::Type;
use sea_orm::{ EnumIter, Iterable };
use sea_orm_migration::{ prelude::*, schema::* };

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // create user_role type
        manager.create_type(
            Type::create().as_enum(UserRoleEnum).values(UserRole::iter()).to_owned()
        ).await?;

        // create user_status type
        manager.create_type(
            Type::create().as_enum(UserStatusEnum).values(UserStatus::iter()).to_owned()
        ).await?;

        // create user table
        manager.create_table(
            Table::create()
                .table(User::Table)
                .if_not_exists()
                .col(pg_primary_id(User::Id))
                .col(string_len_uniq(User::Email, EMAIL_LENGTH))
                .col(string_len(User::FullName, FULL_NAME_LENGTH))
                .col(string_null(User::Password))
                .col(enumeration(User::Status, UserStatusEnum, UserStatus::iter()))
                .col(enumeration(User::Role, UserRoleEnum, UserRole::iter()))
                .col(timestampz_default(User::CreatedAt))
                .col(timestampz_default(User::UpdatedAt))
                .to_owned()
        ).await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // drop user table
        manager.drop_table(Table::drop().table(User::Table).to_owned()).await?;

        // drop type user_role
        manager.drop_type(Type::drop().name(UserRoleEnum).to_owned()).await?;

        // drop type user_status
        manager.drop_type(Type::drop().name(UserStatusEnum).to_owned()).await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
pub enum User {
    Table,
    Id,
    FullName,
    Email,
    Password,
    Status,
    Role,
    CreatedAt,
    UpdatedAt,
}

#[derive(DeriveIden)]
#[sea_orm(iden = "user_role")]
struct UserRoleEnum;

#[derive(Iden, EnumIter)]
pub enum UserRole {
    #[iden = "User"]
    User,
    #[iden = "Admin"]
    Admin,
}

#[derive(DeriveIden)]
#[sea_orm(iden = "user_status")]
struct UserStatusEnum;
#[derive(Iden, EnumIter)]
pub enum UserStatus {
    #[iden = "Active"]
    Active,
    #[iden = "Blocked"]
    Blocked,
}
