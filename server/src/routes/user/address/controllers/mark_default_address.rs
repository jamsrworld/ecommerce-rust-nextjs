use super::create_address::CreateAddressResponse;
use super::messages::AddressMessage;
use crate::{error::{HttpError, ResponseWithMessage}, extractors::auth::Authenticated, AppState};
use actix_web::{
    patch,
    web::{self, Path},
    HttpResponse,
};
use sea_orm::{ActiveModelTrait, ColumnTrait, EntityTrait, QueryFilter, Set};

/// Mark Default Address
#[utoipa::path(
    tag = "Address",
    context_path = "/user/addresses",
    params(
        ("id", description = "Address Id"),
    ),
    responses(
        (status=StatusCode::OK, body = CreateAddressResponse),
        (status=StatusCode::NOT_FOUND, body = ResponseWithMessage),
        (status=StatusCode::INTERNAL_SERVER_ERROR, body = ResponseWithMessage),
    )
)]
#[patch("/{id}/default")]
pub async fn mark_default_address(
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

    let mut address: entity::address::ActiveModel = address.into();
    address.is_default = Set(true);
    let address = address.update(db).await?;

    let response = CreateAddressResponse {
        message: AddressMessage::AddressMarkedAsDefault.to_string(),
        address,
    };
    Ok(HttpResponse::Ok().json(response))
}
