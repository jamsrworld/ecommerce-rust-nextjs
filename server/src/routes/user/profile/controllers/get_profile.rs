use crate::extractors::auth::Authenticated;
use actix_web::{get, HttpResponse, Responder};
use entity::sea_orm_active_enums::UserRole;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Debug, Serialize, Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct UserProfile {
    pub id: String,
    pub email: String,
    pub full_name: String,
    pub role: UserRole,
}

/// Get Profile
#[utoipa::path(
  tag = "Profile",
  context_path = "/user/profile",
  responses( (status=200, body = UserProfile) )
)]
#[get("")]
pub async fn get_profile(user: Authenticated) -> impl Responder {
    let full_name = user.full_name.clone();
    let email = user.email.clone();
    let id = user.id.clone();
    let user = UserProfile {
        full_name,
        email,
        id,
        role: user.role.clone(),
    };
    HttpResponse::Ok().json(user)
}
