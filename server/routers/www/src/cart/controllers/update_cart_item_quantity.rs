use actix_web::{ patch, web::{ self, Path }, HttpResponse };
use extractors::{ auth::Authenticated, validator::ValidatedJson };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use sea_orm::{ ColumnTrait, EntityTrait, QueryFilter, Set, ActiveModelTrait };
use crate::{ cart::schema::{ CartItemWithMessage, CartUpdateQuantityInput }, messages::Messages };

/// Update cart item quantity
#[utoipa::path(
    tag = "Cart",
    context_path = "/carts",
    params(("id", description = "Product Id", min_length = 24, max_length = 24)),
    request_body = CartUpdateQuantityInput,
    responses(
        (status = StatusCode::OK, body = CartItemWithMessage, description = "Cart"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[patch("/quantity/{id}")]
pub async fn update_cart_item_quantity(
    app_data: web::Data<AppState>,
    input: ValidatedJson<CartUpdateQuantityInput>,
    id: Path<String>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let input = input.into_inner();
    let id = id.into_inner();
    let db = &app_data.db;
    let user_id = user.id.to_owned();
    let quantity = input.quantity;

    let cart_item = entity::cart::Entity
        ::find_by_id(&id)
        .filter(entity::cart::Column::UserId.eq(user_id))
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(Messages::CartItemNotFound(&id).to_string()))?;
    let mut cart_item: entity::cart::ActiveModel = cart_item.into();
    cart_item.quantity = Set(quantity);
    let cart_item = cart_item.update(db).await?;

    let response = CartItemWithMessage {
        data: cart_item,
        message: Messages::CartItemUpdated(&id).to_string(),
    };

    Ok(HttpResponse::Ok().json(response))
}
