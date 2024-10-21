use actix_web::{ web, Scope };
use attributes::attributes_routes;
use categories::category_routes;
use products::products_routes;

pub mod attributes;
pub mod products;
pub mod categories;

pub fn product_management_routes() -> Scope {
    web::scope("/product-management")
        .service(attributes_routes())
        .service(category_routes())
        .service(products_routes())
}
