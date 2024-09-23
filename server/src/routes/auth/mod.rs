use actix_web::{web, Scope};

pub mod controllers;
pub mod messages;
pub mod utils;

use controllers::*;

pub fn auth_routes() -> Scope {
    web::scope("/auth")
        .service(login::login)
        .service(register::register)
        .service(register_verify::register_verify)
        .service(forgot_password::forgot_password)
        .service(reset_password::reset_password)
        .service(logout::logout)
}
