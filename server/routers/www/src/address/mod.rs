use actix_web::web;
pub mod controllers;
mod utils;
pub mod schema;

use controllers::*;
use entity::sea_orm_active_enums::UserRole;
use middlewares::auth::RequireAuth;

pub fn address_routes(config: &mut web::ServiceConfig) {
    config.service(
        web
            ::scope("/addresses")
            .wrap(RequireAuth::allowed_roles(vec![UserRole::User]))
            .service(get_address::get_address)
            .service(get_addresses::get_addresses)
            .service(create_address::create_address)
            .service(update_address::update_address)
            .service(delete_address::delete_address)
            .service(mark_default_address::mark_default_address)
    );
}
