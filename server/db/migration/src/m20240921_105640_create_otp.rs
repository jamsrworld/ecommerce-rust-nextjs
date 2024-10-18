use extension::postgres::Type;
use sea_orm::{EnumIter, Iterable};
use sea_orm_migration::{prelude::*, schema::*};

use crate::{config::EMAIL_LENGTH, utils::pg_primary_id};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // create otp_purpose type
        manager
            .create_type(
                Type::create()
                    .as_enum(OtpPurposeEnum)
                    .to_owned()
                    .values(OtpPurpose::iter())
                    .to_owned(),
            )
            .await?;

        // create otp table
        manager
            .create_table(
                Table::create()
                    .table(Otp::Table)
                    .if_not_exists()
                    .col(pg_primary_id(Otp::Id))
                    .col(small_integer(Otp::Code))
                    .col(string_len(Otp::Email, EMAIL_LENGTH))
                    .col(timestamp_with_time_zone(Otp::ValidTill))
                    .col(enumeration(
                        Otp::Purpose,
                        OtpPurposeEnum,
                        OtpPurpose::iter(),
                    ))
                    .to_owned(),
            )
            .await?;

        // create unique index on email, otp and purpose
        manager
            .create_index(
                Index::create()
                    .name("email_otp_purpose_idx")
                    .table(Otp::Table)
                    .col(Otp::Email)
                    .col(Otp::Code)
                    .col(Otp::Purpose)
                    .unique()
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        // drop unique index
        manager
            .drop_index(Index::drop().name("email_otp_purpose_idx").to_owned())
            .await?;

        // drop otp table
        manager
            .drop_table(Table::drop().table(Otp::Table).to_owned())
            .await?;

        // drop otp_purpose type
        manager
            .drop_type(Type::drop().name(OtpPurposeEnum).to_owned())
            .await?;

        Ok(())
    }
}

#[derive(DeriveIden)]
enum Otp {
    Table,
    Id,
    Code,
    Email,
    ValidTill,
    Purpose,
}

#[derive(DeriveIden)]
#[sea_orm(iden = "otp_purpose")]
struct OtpPurposeEnum;
#[derive(Iden, EnumIter)]
pub enum OtpPurpose {
    #[iden = "Register"]
    Register,
    #[iden = "Login"]
    Login,
    #[iden = "ResetPassword"]
    ResetPassword,
}
