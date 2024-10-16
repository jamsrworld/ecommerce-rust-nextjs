use actix_web::web;
pub mod controllers;
mod messages;
pub mod schema;

use controllers::*;

pub fn address_routes(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("/addresses")
            .service(get_address::get_address)
            .service(get_addresses::get_addresses)
            .service(create_address::create_address)
            .service(update_address::update_address)
            .service(delete_address::delete_address)
            .service(mark_default_address::mark_default_address),
    );
}
