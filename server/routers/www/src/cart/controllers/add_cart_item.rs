use actix_web::{ post, web::{ self, Path }, HttpResponse };
use extractors::auth::Authenticated;
use utils::{ db::create_primary_id, error::{ HttpError, ResponseWithMessage }, AppState };
use sea_orm::{ sea_query, ActiveValue::NotSet, EntityTrait, Set };

use crate::messages::Messages;

/// Add product to cart
#[utoipa::path(
    tag = "Cart",
    context_path = "/carts",
    params(("id", description = "Product Id", min_length = 24, max_length = 24)),
    responses(
        (status = StatusCode::OK, body = entity::cart::Model, description = "Cart"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[post("/product/{id}")]
pub async fn add_cart_item(
    app_data: web::Data<AppState>,
    product_id: Path<String>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let product_id = product_id.into_inner();
    let db = &app_data.db;
    let user_id = user.id.to_owned();

    let product = entity::product::Entity
        ::find_by_id(&product_id)
        .one(db).await?
        .ok_or_else(|| { HttpError::not_found("Invalid product") })?;

    let cart_item = entity::cart::ActiveModel {
        id: Set(create_primary_id()),
        user_id: Set(user_id),
        product_id: Set(product_id.to_owned()),
        quantity: Set(1),
        created_at: NotSet,
    };

    entity::cart::Entity
        ::insert(cart_item)
        .on_conflict(
            sea_query::OnConflict
                ::columns([entity::cart::Column::UserId, entity::cart::Column::ProductId])
                .do_nothing()
                .to_owned()
        )
        .exec_without_returning(db).await?;

    let response = ResponseWithMessage {
        message: Messages::CartItemCreated(&product.title).to_string(),
    };

    Ok(HttpResponse::Ok().json(response))
}
