use std::time::Duration;
use actix_extensible_rate_limit::{ backend::SimpleInputFunctionBuilder, RateLimiter };
use actix_web::{ dev::Service as _, web, HttpResponse };
use controllers::{
    continue_with_google::continue_with_google,
    forgot_password::forgot_password,
    login::login,
    logout::logout,
    register::register,
    register_verify::register_verify,
    reset_password::reset_password,
};
use futures_util::future::FutureExt;
use serde_json::json;
use ::utils::AppState;

pub mod controllers;
pub mod schema;
mod utils;

pub fn auth_routes(config: &mut web::ServiceConfig, app_data: web::Data<AppState>) {
    let redis_backend = app_data.redis_backend.to_owned();

    let input = SimpleInputFunctionBuilder::new(Duration::from_secs(60), 10).real_ip_key().build();
    let rate_limit_middleware = RateLimiter::builder(redis_backend, input)
        .request_denied_response(|_| {
            HttpResponse::TooManyRequests().json(json!({ "message": "Too many requests" }))
        })
        .build();

    // rate_limit_middleware;

    config.service(
        web
            ::scope("/auth")
            .wrap(rate_limit_middleware)
            .wrap_fn(|req, srv| {
                // let app_data = req.app_data::<web::Data<AppState>>().unwrap();
                // info!("Inside auth routes");
                srv.call(req).map(|res| res)
            })
            .service(login)
            .service(register)
            .service(register_verify)
            .service(forgot_password)
            .service(reset_password)
            .service(logout)
            .service(continue_with_google)
    );
}
