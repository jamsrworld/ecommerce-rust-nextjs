//! `SeaORM` Entity, @generated by sea-orm-codegen 1.0.1

use sea_orm::entity::prelude::*;
use serde::{ Deserialize, Serialize };

#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Serialize,
    Deserialize,
    utoipa::ToSchema
)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "otp_purpose")]
pub enum OtpPurpose {
    #[sea_orm(string_value = "Login")]
    Login,
    #[sea_orm(string_value = "Register")]
    Register,
    #[sea_orm(string_value = "ResetPassword")]
    ResetPassword,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Serialize,
    Deserialize,
    utoipa::ToSchema
)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "user_role")]
pub enum UserRole {
    #[sea_orm(string_value = "Admin")]
    Admin,
    #[sea_orm(string_value = "User")]
    User,
}
#[derive(
    Debug,
    Clone,
    PartialEq,
    Eq,
    EnumIter,
    DeriveActiveEnum,
    Serialize,
    Deserialize,
    utoipa::ToSchema
)]
#[sea_orm(rs_type = "String", db_type = "Enum", enum_name = "user_status")]
pub enum UserStatus {
    #[sea_orm(string_value = "Active")]
    Active,
    #[sea_orm(string_value = "Blocked")]
    Blocked,
}
