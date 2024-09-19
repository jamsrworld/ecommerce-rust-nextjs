use std::env;

#[derive(Debug)]
pub struct Config {
    pub database_url: String,
    pub port: u16,
}

impl Config {
    pub fn new() -> Self {
        let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let port = env::var("PORT").expect("PORT must be set");
        Self {
            database_url,
            port: port.parse().expect("PORT must be a number"),
        }
    }
}
