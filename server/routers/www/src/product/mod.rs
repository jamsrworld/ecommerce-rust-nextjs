use actix_web::web;

pub mod controllers;

use controllers::*;
use get_product::get_product;
use get_products::get_products;

pub fn product_routes(config: &mut web::ServiceConfig) {
    config.service(web::scope("/products").service(get_product).service(get_products));
}
