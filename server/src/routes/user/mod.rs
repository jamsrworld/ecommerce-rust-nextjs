use crate::middlewares::auth::RequireAuth;
use actix_web::web;
use address::address_routes;
use entity::sea_orm_active_enums::UserRole;
use orders::order_routes;
use profile::profile_routes;

pub mod address;
pub mod orders;
pub mod profile;

pub fn user_routes(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("/user")
            .wrap(RequireAuth::allowed_roles(vec![UserRole::User]))
            .configure(address_routes)
            .configure(order_routes)
            .configure(profile_routes),
    );
}
