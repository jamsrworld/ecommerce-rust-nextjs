use actix_web::web;
mod auth;
mod user;

pub fn www_routes(config: &mut web::ServiceConfig) {
    config.service(web::scope("/").configure(user::user_routes));
}
