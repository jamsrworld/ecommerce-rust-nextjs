use actix_web::{web, Scope};
pub mod controllers;
use super::auth::controllers::login;

pub fn auth_routes() -> Scope {
    web::scope("/auth").service(login::login)
}
