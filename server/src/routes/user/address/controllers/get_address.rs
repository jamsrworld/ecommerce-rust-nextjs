use super::messages::AddressMessage;
use crate::{error::HttpError, extractors::auth::Authenticated, AppState};
use actix_web::{
    get,
    web::{self, Path},
    HttpResponse,
};
use sea_orm::{ColumnTrait, EntityTrait, QueryFilter};

/// Get An Address
#[utoipa::path(
    tag = "Address",
    context_path = "/user/addresses",
    params(
        ("id", description = "Address Id"),
    ),
)]
#[get("/{id}")]
pub async fn get_address(
    app_data: web::Data<AppState>,
    id: Path<String>,
    user: Authenticated,
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let address_id = id.into_inner();
    let user_id = user.id.clone();

    let address = entity::address::Entity::find_by_id(&address_id)
        .filter(entity::address::Column::UserId.eq(user_id))
        .one(db)
        .await?
        .ok_or_else(|| HttpError::not_found(AddressMessage::AddressNotFound(&address_id)))?;

    Ok(HttpResponse::Ok().json(address))
}
