use actix_web::web;
use controllers::{ get_order::get_order, get_orders::get_orders };
use entity::sea_orm_active_enums::UserRole;
use middlewares::auth::RequireAuth;

pub mod controllers;
pub mod schema;

pub fn order_routes(config: &mut web::ServiceConfig) {
    config.service(
        web
            ::scope("/orders")
            .wrap(RequireAuth::allowed_roles(vec![UserRole::User]))
            .service(get_order)
            .service(get_orders)
    );
}
