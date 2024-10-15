use crate::extractors::auth::Authenticated;
use actix_web::{get, HttpResponse, Responder};
use chrono::{DateTime, Utc};
use sea_orm::prelude::DateTimeWithTimeZone;
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
    pub status: UserStatus,
    pub role: UserRole,
    pub created_at: String,
    pub updated_at: String,
}

/// Get Profile
#[utoipa::path(
  tag = "User",
  context_path = "/profile",
  responses( (status=200, body = UserProfile) )
)]
#[get("/user")]
pub async fn get_user(user: Authenticated) -> impl Responder {
    println!("user{:#?}", user);
    HttpResponse::Ok().json(user)
}
