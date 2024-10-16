pub mod controllers;
mod messages;
mod schema;

use actix_web::web;
use controllers::{get_order, get_orders};

pub fn order_routes(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("/orders")
            .service(get_order::get_order)
            .service(get_orders::get_orders),
    );
}
