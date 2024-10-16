pub mod controllers;
mod messages;
mod schema;

use actix_web::web;
use controllers::{get_profile, update_profile};

pub fn profile_routes(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("/profile")
            .service(update_profile::update_profile)
            .service(get_profile::get_profile)
            .service(controllers::change_password::change_password)
            .service(controllers::logout_all::logout_all),
    );
}
