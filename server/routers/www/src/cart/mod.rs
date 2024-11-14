use actix_web::web;
use controllers::{
    add_cart_item::add_cart_item,
    get_cart_data::get_cart_data,
    place_order::place_order,
    remove_cart_item::remove_cart_item,
    update_cart_item_quantity::update_cart_item_quantity,
};
use entity::sea_orm_active_enums::UserRole;
use middlewares::auth::RequireAuth;

pub mod controllers;
pub mod schema;
mod messages;

pub fn cart_routes(config: &mut web::ServiceConfig) {
    config.service(
        web
            ::scope("/carts")
            .wrap(RequireAuth::allowed_roles(vec![UserRole::User]))
            .service(add_cart_item)
            .service(remove_cart_item)
            .service(get_cart_data)
            .service(update_cart_item_quantity)
            .service(place_order)
    );
}
