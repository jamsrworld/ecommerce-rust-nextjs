use actix_web::{web, Scope};
pub mod controllers;

use controllers::*;

pub fn extra_routes() -> Scope {
    web::scope("/extra").service(server_information::server_information)
}
