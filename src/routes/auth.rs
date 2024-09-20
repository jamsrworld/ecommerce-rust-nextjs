use actix_web::{web, Scope};

pub mod forgot_password;
pub mod login;
pub mod logout;
pub mod register;
pub mod reset_password;

pub fn auth_routes() -> Scope {
    web::scope("/auth")
        .service(login::login)
        .service(register::register)
        .service(forgot_password::forgot_password)
        .service(reset_password::reset_password)
        .service(logout::logout)
}
