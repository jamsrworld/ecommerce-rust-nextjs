use crate::error::HttpError;
use crate::AppState;
use crate::{extractors::validator::ValidatedJson, validator::profile::UpdateProfile};
use actix_web::{get, post, web, HttpResponse, Responder, Scope};

pub fn profile_routes() -> Scope {
    web::scope("/profile").service(update_profile)
}

/// Update Profile
#[utoipa::path(
    tag = "User",
    context_path = "/profile",
    request_body(content = UpdateProfile),
    responses( (status=200, body = String) )
)]
#[post("/me")]
pub async fn update_profile(input: ValidatedJson<UpdateProfile>) -> impl Responder {
    println!("User Update: {:#?}", input);
    HttpResponse::Ok().body("User profile updated")
}
