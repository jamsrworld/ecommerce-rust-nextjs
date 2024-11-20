use actix_web::web;
use address::address_routes;
use auth::auth_routes;
use cart::cart_routes;
use checkout::checkout_routes;
use hello::health_check;
use order::order_routes;
use product::product_routes;
use profile::profile_routes;
use utils::AppState;
use utoipa::OpenApi;
mod auth;
mod hello;
mod product;
mod cart;
mod checkout;
mod order;
mod models;
mod profile;
mod address;
mod messages;
mod schemas;

#[utoipauto::utoipauto(paths = "./routers/www")]
#[derive(OpenApi)]
#[openapi(info(title = "Mcart api documentation"), paths())]
pub struct WwwApiDoc;

pub fn www_routes(config: &mut web::ServiceConfig, app_data: web::Data<AppState>) {
    config.service(
        web
            ::scope("")
            .service(health_check)
            .configure(|cfg| auth_routes(cfg, app_data))
            .configure(product_routes)
            .configure(cart_routes)
            .configure(checkout_routes)
            .configure(order_routes)
            .configure(address_routes)
            .configure(profile_routes)
    );
}
