mod controllers;

use crate::{extractors::validator::ValidatedJson, validator::profile::UpdateProfile};
use actix_web::{post, web, HttpResponse, Responder, Scope};

pub fn profile_routes() -> Scope {
    web::scope("/profile").service(update_profile)
}
