use actix_web::{web, Scope};

pub mod attributes;

pub fn product_management_routes() -> Scope {
    web::scope("/product-management").service(attributes::attributes_routes())
}
