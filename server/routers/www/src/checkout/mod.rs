use actix_web::web;
use controllers::{
    checkout_product::checkout_product,
    get_checkout_data::get_checkout_data,
    proceed_checkout::proceed_checkout,
};
use entity::sea_orm_active_enums::UserRole;
use middlewares::auth::RequireAuth;

pub mod controllers;
pub mod schema;

pub fn checkout_routes(config: &mut web::ServiceConfig) {
    config.service(
        web
            ::scope("/checkouts")
            .wrap(RequireAuth::allowed_roles(vec![UserRole::User]))
            .service(get_checkout_data)
            .service(proceed_checkout)
            .service(checkout_product)
    );
}
