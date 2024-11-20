pub mod controllers;
mod messages;
pub mod schema;

use actix_web::web;
use controllers::{
    change_password::change_password,
    get_profile::get_profile,
    logout_all::logout_all,
    update_profile::update_profile,
};
use entity::sea_orm_active_enums::UserRole;
use middlewares::auth::RequireAuth;

pub fn profile_routes(config: &mut web::ServiceConfig) {
    config.service(
        web
            ::scope("/profile")
            .wrap(RequireAuth::allowed_roles(vec![UserRole::User]))
            .service(update_profile)
            .service(get_profile)
            .service(change_password)
            .service(logout_all)
    );
}
