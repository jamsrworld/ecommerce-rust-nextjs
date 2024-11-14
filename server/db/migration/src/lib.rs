pub use sea_orm_migration::prelude::*;
pub mod config;
pub mod utils;

mod m20220101_000001_create_user;
mod m20240919_082400_create_login_session;
mod m20240921_105640_create_otp;
mod m20241016_050719_address;
mod m20241020_062623_attribute;
mod m20241021_041020_category;
mod m20241021_041026_product;
mod m20241112_052556_cart;
mod m20241114_074243_checkout;
mod m20241114_102614_order;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20220101_000001_create_user::Migration),
            Box::new(m20240919_082400_create_login_session::Migration),
            Box::new(m20240921_105640_create_otp::Migration),
            Box::new(m20241016_050719_address::Migration),
            Box::new(m20241020_062623_attribute::Migration),
            Box::new(m20241021_041020_category::Migration),
            Box::new(m20241021_041026_product::Migration),
            Box::new(m20241112_052556_cart::Migration),
            Box::new(m20241114_074243_checkout::Migration),
            Box::new(m20241114_102614_order::Migration),
        ]
    }
}
