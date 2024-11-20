use std::env;

pub mod session_keys;

#[derive(Debug)]
pub struct Config {
    pub database_url: String,
    pub jwt_secret: String,
    pub google_client_id: String,
    pub google_client_secret: String,
    pub google_redirect_uri: String,
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
        let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
        let google_redirect_uri = env
            ::var("GOOGLE_REDIRECT_URI")
            .expect("GOOGLE_REDIRECT_URI must be set");

        Self {
            database_url,
            jwt_secret,
            google_client_id,
            google_client_secret,
            google_redirect_uri,
            port: port.parse().expect("PORT must be a number"),
        }
    }
}
