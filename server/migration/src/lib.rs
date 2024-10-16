pub use sea_orm_migration::prelude::*;
pub mod config;
pub mod utils;

mod m20220101_000001_create_user;
mod m20240919_082400_create_login_session;
mod m20240921_105640_create_otp;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220101_000001_create_user::Migration),
            Box::new(m20240919_082400_create_login_session::Migration),
            Box::new(m20240921_105640_create_otp::Migration)
        ]
    }
}
