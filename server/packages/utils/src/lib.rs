use sea_orm::{ConnectOptions, Database, DatabaseConnection};

pub mod cookie;
pub mod error;
pub mod jwt;
pub mod number;
pub mod password;

pub struct AppState {
    pub db: DatabaseConnection,
}
