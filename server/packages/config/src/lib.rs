use std::env;

pub mod session_keys;

#[derive(Debug)]
pub struct Config {
    pub database_url: String,
    pub google_client_id: String,
    pub google_client_secret: String,
    pub port: u16,
}

impl Config {
    pub fn new() -> Self {
        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let port = env::var("PORT").expect("PORT must be set");
        let google_client_id = env::var("GOOGLE_CLIENT_ID").expect("GOOGLE_CLIENT_ID must be set");
        let google_client_secret = env
            ::var("GOOGLE_CLIENT_SECRET")
            .expect("GOOGLE_CLIENT_SECRET must be set");

        Self {
            database_url,
            google_client_id,
            google_client_secret,
            port: port.parse().expect("PORT must be a number"),
        }
    }
}
