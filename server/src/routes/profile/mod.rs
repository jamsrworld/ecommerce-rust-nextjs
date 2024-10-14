pub mod controllers;

use actix_web::{web, Scope};
use controllers::{get_user, update_profile};
use entity::sea_orm_active_enums::UserRole;

use crate::middlewares::auth::RequireAuth;

pub fn profile_routes(config: &mut web::ServiceConfig) {
    config.service(
        web::scope("/profile")
            .wrap(RequireAuth::allowed_roles(vec![UserRole::User]))
            .service(update_profile::update_profile)
            .service(get_user::get_user),
    );
}
