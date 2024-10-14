use crate::{extractors::validator::ValidatedJson, validator::profile::UpdateProfile};
use actix_web::{post, HttpResponse, Responder};

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
