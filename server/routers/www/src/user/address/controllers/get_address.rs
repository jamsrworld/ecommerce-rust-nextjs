use super::messages::AddressMessage;
use actix_web::{ get, web::{ self, Path }, HttpResponse };
use extractors::auth::Authenticated;
use sea_orm::{ ColumnTrait, EntityTrait, QueryFilter };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };

/// Get an Address
#[utoipa::path(
    tag = "Address",
    context_path = "/user/addresses",
    params(("id", description = "Address Id", min_length = 24, max_length = 24)),
    responses(
        (status = StatusCode::OK, body = entity::address::Model, description = "Address"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[get("/{id}")]
pub async fn get_address(
    app_data: web::Data<AppState>,
    id: Path<String>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let address_id = id.into_inner();
    let user_id = user.id.clone();

    let address = entity::address::Entity
        ::find_by_id(&address_id)
        .filter(entity::address::Column::UserId.eq(user_id))
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(AddressMessage::AddressNotFound(&address_id)))?;
    Ok(HttpResponse::Ok().json(address))
}
