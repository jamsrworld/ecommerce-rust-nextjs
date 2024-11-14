use actix_web::{ patch, web, HttpResponse };
use extractors::{ auth::Authenticated, validator::ValidatedJson };
use sea_orm::{ EntityTrait, Set, ActiveModelTrait };
use serde::{ Deserialize, Serialize };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use utoipa::ToSchema;
use validator::Validate;
use super::ProfileMessage;

#[derive(Debug, Validate, Deserialize, ToSchema, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct UpdateProfileInput {
    full_name: String,
}

/// Update Profile
#[utoipa::path(
    tag = "Profile",
    context_path = "/profile",
    request_body(content = UpdateProfileInput),
    responses((status = 200, body = ResponseWithMessage))
)]
#[patch("")]
pub async fn update_profile(
    app_data: web::Data<AppState>,
    user: Authenticated,
    input: ValidatedJson<UpdateProfileInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let user_id = user.id.clone();

    // update user full_name
    let full_name = input.into_inner().full_name;

    let user = entity::user::Entity
        ::find_by_id(user_id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found("User not found"))?;

    let mut user: entity::user::ActiveModel = user.into();
    user.full_name = Set(full_name);
    user.update(db).await?;

    let response = ResponseWithMessage {
        message: ProfileMessage::ProfileUpdated().to_string(),
    };

    Ok(HttpResponse::Ok().json(response))
}
