use std::time::Duration;

use actix_extensible_rate_limit::{
    backend::{ redis::RedisBackend, SimpleInputFunctionBuilder },
    RateLimiter,
};
use actix_web::{ web, HttpResponse, Scope };
use controllers::{
    continue_with_google::continue_with_google,
    forgot_password::forgot_password,
    login::login,
    logout::logout,
    register::register,
    register_verify::register_verify,
    reset_password::reset_password,
};
use serde_json::json;
use ::utils::AppState;

pub mod controllers;
pub mod schema;
mod messages;
mod utils;

pub fn auth_routes(config: &mut web::ServiceConfig) {
    let app_data = config.app_data::<web::Data<AppState>>();

    let connection = app_data.redis_connection.to_owned();
    // Assign a limit of 5 requests per minute per client ip address
    let input = SimpleInputFunctionBuilder::new(Duration::from_secs(60), 2).real_ip_key().build();
    let backend = RedisBackend::builder(connection).build();

    let middleware = RateLimiter::builder(backend.clone(), input)
        .request_denied_response(|c| {
            println!("Request denied: {:?}", c);
            HttpResponse::TooManyRequests().json(
                json!({
              "message": "Too many requests"
          })
            )
        })
        .build();

    config.service(
        web
            ::scope("/auth")
            .wrap(middleware)
            .service(login)
            .service(register)
            .service(register_verify)
            .service(forgot_password)
            .service(reset_password)
            .service(logout)
            .service(continue_with_google)
    );
}
