use crate::extractors::auth::Authenticated;
use actix_web::{get, HttpResponse, Responder};
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(ToSchema, Debug, Serialize, Deserialize)]
pub enum UserRole {
    Admin,
    User,
}

#[derive(ToSchema, Debug, Serialize, Deserialize)]
pub enum UserStatus {
    Active,
    Blocked,
}

#[derive(Debug, Serialize, Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct UserProfile {
    pub id: String,
    pub email: String,
    pub full_name: String,
}

/// Get Profile
#[utoipa::path(
  tag = "User",
  context_path = "/profile",
  responses( (status=200, body = UserProfile) )
)]
#[get("/user")]
pub async fn get_user(user: Authenticated) -> impl Responder {
    // let user::Model {
    //     full_name,
    //     email,
    //     id,
    //     ..
    // } = *user;
    let full_name = user.full_name.clone();
    let email = user.email.clone();
    let id = user.id.clone();
    let user = UserProfile {
        full_name,
        email,
        id,
    };
    HttpResponse::Ok().json(user)
}
