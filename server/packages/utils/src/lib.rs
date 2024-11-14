use config::Config;
use sea_orm::DatabaseConnection;

pub mod cookie;
pub mod error;
pub mod jwt;
pub mod number;
pub mod password;

pub struct AppState {
    pub db: DatabaseConnection,
    pub env: Config,
    pub redis_connection: redis::aio::ConnectionManager,
}
