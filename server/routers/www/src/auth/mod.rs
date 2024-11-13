use actix_web::{ web, Scope };
use controllers::{
    continue_with_google::continue_with_google,
    forgot_password::forgot_password,
    login::login,
    logout::logout,
    register::register,
    register_verify::register_verify,
    reset_password::reset_password,
};

pub mod controllers;
pub mod schema;
mod messages;
mod utils;

pub fn auth_routes() -> Scope {
    web::scope("/auth")
        .service(login)
        .service(register)
        .service(register_verify)
        .service(forgot_password)
        .service(reset_password)
        .service(logout)
        .service(continue_with_google)
}
