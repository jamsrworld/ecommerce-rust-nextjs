use actix_web::{web, Scope};
use controllers::*;
use create_product::create_product;
use delete_product::delete_product;
use get_product::get_product;
use get_products::get_products;
use update_product::update_product;

pub mod controllers;
pub mod schema;
mod messages;

pub fn products_routes() -> Scope {
    web::scope("/products")
        .service(create_product)
        .service(update_product)
        .service(get_product)
        .service(get_products)
        .service(delete_product)
}
