use actix_web::{web, Scope};
use controllers::*;
use create_category::create_category;
use delete_category::delete_category;
use get_categories::get_categories;
use get_category::get_category;
use update_category::update_category;

pub mod controllers;
pub mod schema;
mod messages;

pub fn category_routes() -> Scope {
    web::scope("/categories")
        .service(create_category)
        .service(update_category)
        .service(get_category)
        .service(get_categories)
        .service(delete_category)
}
