use std::env;

pub mod session_keys;

#[derive(Debug)]
pub struct MailConfig {
    pub username: String,
    pub password: String,
    pub host: String,
    pub port: u16,
}

#[derive(Debug)]
pub struct Config {
    pub database_url: String,
    pub jwt_secret: String,
    pub google_client_id: String,
    pub google_client_secret: String,
    pub app_server_url: String,
    pub redis_url: String,
    pub port: u16,
    pub mail: MailConfig,
}

impl Config {
    pub fn new() -> Self {
        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let port = env::var("PORT").expect("PORT must be set");
        let port = port.parse().expect("PORT must be a number");
        let google_client_id = env::var("GOOGLE_CLIENT_ID").expect("GOOGLE_CLIENT_ID must be set");
        let google_client_secret = env
            ::var("GOOGLE_CLIENT_SECRET")
            .expect("GOOGLE_CLIENT_SECRET must be set");
        let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
        let redis_url = env::var("REDIS_URL").expect("REDIS_URL must be set");
        let app_server_url = env::var("APP_SERVER_URL").expect("APP_SERVER_URL must be set");

        let mail_username = env::var("MAIL_USERNAME").expect("MAIL_USERNAME must be set");
        let mail_password = env::var("MAIL_PASSWORD").expect("MAIL_PASSWORD must be set");
        let mail_host = env::var("MAIL_HOST").expect("MAIL_HOST must be set");
        let mail_port = env::var("MAIL_PORT").expect("MAIL_PORT must be set");
        let mail = MailConfig {
            username: mail_username,
            password: mail_password,
            host: mail_host,
            port: mail_port.parse().expect("MAIL_PORT must be a number"),
        };

        Self {
            database_url,
            jwt_secret,
            google_client_id,
            google_client_secret,
            app_server_url,
            redis_url,
            port,
            mail,
        }
    }
}
