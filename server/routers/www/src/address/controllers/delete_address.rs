use super::messages::AddressMessage;
use actix_web::{ delete, web::{ self, Path }, HttpResponse };
use extractors::auth::Authenticated;
use sea_orm::{ ColumnTrait, EntityTrait, ModelTrait, QueryFilter };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };

/// Delete An Address
#[utoipa::path(
    tag = "Address",
    context_path = "/addresses",
    params(Id),
    params(("id", description = "Address Id", min_length = 24, max_length = 24)),
    responses(
        (status = StatusCode::OK, body = ResponseWithMessage, description = "Address Deleted"),
        (
            status = StatusCode::NOT_FOUND,
            body = ResponseWithMessage,
            description = "Address Not Found",
        ),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[delete("/{id}")]
pub async fn delete_address(
    app_data: web::Data<AppState>,
    id: Path<String>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let address_id = id.into_inner();
    let user_id = user.id.clone();

    // find address
    let address = entity::address::Entity
        ::find_by_id(&address_id)
        .filter(entity::address::Column::UserId.eq(user_id))
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(AddressMessage::AddressNotFound(&address_id)))?;
    // delete address
    address.delete(db).await?;

    let response = ResponseWithMessage {
        message: AddressMessage::AddressDeleted.to_string(),
    };
    Ok(HttpResponse::Ok().json(response))
}
