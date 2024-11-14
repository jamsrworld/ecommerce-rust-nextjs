use actix_web::web;
use auth::auth_routes;
use cart::cart_routes;
use hello::health_check;
use product::product_routes;
use utoipa::OpenApi;
mod auth;
mod hello;
mod user;
mod product;
mod cart;

use user::user_routes;

#[utoipauto::utoipauto(paths = "./routers/www")]
#[derive(OpenApi)]
#[openapi(info(title = "Mcart api documentation"), paths())]
pub struct WwwApiDoc;

pub fn www_routes(config: &mut web::ServiceConfig) {
    config.service(
        web
            ::scope("")
            .service(health_check)
            .configure(auth_routes)
            .configure(user_routes)
            .configure(product_routes)
            .configure(cart_routes)
    );
}
