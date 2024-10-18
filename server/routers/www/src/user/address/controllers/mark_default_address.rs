use super::create_address::CreateAddressResponse;
use super::messages::AddressMessage;
use actix_web::{
    patch,
    web::{self, Path},
    HttpResponse,
};
use extractors::auth::Authenticated;
use migration::SimpleExpr;
use sea_orm::{ActiveModelTrait, ColumnTrait, EntityTrait, QueryFilter, Set, Value};
use utils::{
    error::{HttpError, ResponseWithMessage},
    AppState,
};

/// Mark Default Address
#[utoipa::path(
    tag = "Address",
    context_path = "/user/addresses",
    params(("id", description = "Address Id", min_length = 24, max_length = 24)),
    responses(
        (status=StatusCode::OK, body = CreateAddressResponse, description= "Address Marked as Default"),
        (status=StatusCode::NOT_FOUND, body = ResponseWithMessage, description= "Address Not Found"),
        (status=StatusCode::INTERNAL_SERVER_ERROR, body = ResponseWithMessage, description= "Internal Server Error"),
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
        .filter(entity::address::Column::UserId.eq(&user_id))
        .one(db)
        .await?
        .ok_or_else(|| HttpError::not_found(AddressMessage::AddressNotFound(&address_id)))?;

    let mut address: entity::address::ActiveModel = address.into();

    // mark all other addresses as non default
    entity::address::Entity::update_many()
        .col_expr(
            entity::address::Column::IsDefault,
            SimpleExpr::Value(Value::Bool(Option::Some(false))),
        )
        .filter(entity::address::Column::UserId.eq(&user_id))
        .exec(db)
        .await?;

    address.is_default = Set(true);
    let address = address.update(db).await?;

    let response = CreateAddressResponse {
        message: AddressMessage::AddressMarkedAsDefault.to_string(),
        data: address,
    };
    Ok(HttpResponse::Ok().json(response))
}
