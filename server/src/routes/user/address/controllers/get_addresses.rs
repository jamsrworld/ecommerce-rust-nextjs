use crate::{error::HttpError, extractors::auth::Authenticated, AppState};
use actix_web::{get, web, HttpResponse};
use sea_orm::{ColumnTrait, EntityTrait, QueryFilter};

/// Get All Addresses
#[utoipa::path(tag = "Address", context_path = "/user/addresses")]
#[get("")]
pub async fn get_addresses(
    app_data: web::Data<AppState>,
    user: Authenticated,
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let user_id = user.id.clone();

    let addresses = entity::address::Entity::find()
        .filter(entity::address::Column::UserId.eq(user_id))
        .all(db)
        .await?;

    Ok(HttpResponse::Ok().json(addresses))
}
