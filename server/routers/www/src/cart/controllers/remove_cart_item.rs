use actix_web::{ delete, web::{ self, Path }, HttpResponse };
use extractors::auth::Authenticated;
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use sea_orm::{ EntityTrait, QueryFilter, ColumnTrait, ActiveModelTrait };
use crate::messages::Messages;

/// Remove cart item
#[utoipa::path(
    tag = "Cart",
    context_path = "/carts",
    params(("id", description = "Cart Item Id", min_length = 24, max_length = 24)),
    responses(
        (status = StatusCode::OK, body = ResponseWithMessage, description = "Item delete message"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[delete("/{id}")]
pub async fn remove_cart_item(
    app_data: web::Data<AppState>,
    id: Path<String>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let id = id.into_inner();
    let db = &app_data.db;
    let user_id = user.id.to_owned();

    let cart_item = entity::cart::Entity
        ::find_by_id(&id)
        .filter(entity::cart::Column::UserId.eq(user_id))
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(Messages::CartItemNotFound(&id).to_string()))?;

    let cart_item: entity::cart::ActiveModel = cart_item.into();
    cart_item.delete(db).await?;

    let response = ResponseWithMessage {
        message: Messages::CartItemRemoved(&id).to_string(),
    };
    Ok(HttpResponse::Ok().json(response))
}
