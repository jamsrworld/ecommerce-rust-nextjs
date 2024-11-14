use actix_web::{ get, web::{ self }, HttpResponse };
use extractors::auth::Authenticated;
use serde::{ Deserialize, Serialize };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use sea_orm::{ ColumnTrait, EntityTrait, QueryFilter, QueryOrder };
use utoipa::ToSchema;

use crate::models::RelationProductItem;

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct CartItemsWithProduct {
    id: String,
    product_id: String,
    quantity: i16,
    product: RelationProductItem,
}

#[derive(Debug, Serialize, Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct CartUserData {
    count: i64,
    total_amount: f64,
    items: Vec<CartItemsWithProduct>,
}

/// Get all cart items
#[utoipa::path(
    tag = "Cart",
    context_path = "/carts",
    responses(
        (status = StatusCode::OK, body = CartUserData, description = "Cart Items"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[get("")]
pub async fn get_cart_data(
    app_data: web::Data<AppState>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let user_id = user.id.to_owned();
    let records = entity::cart::Entity
        ::find()
        .filter(entity::cart::Column::UserId.eq(user_id))
        .find_also_related(entity::product::Entity)
        .order_by_desc(entity::cart::Column::CreatedAt)
        .all(db).await?;

    let result = records
        .into_iter()
        .map(|(cart, product)| {
            let product:RelationProductItem = product.unwrap().into();
            CartItemsWithProduct {
                id: cart.id,
                product_id: cart.product_id,
                quantity: cart.quantity,
                product,
            }
        })
        .collect::<Vec<CartItemsWithProduct>>();

    let count = result.len() as i64;
    let total_amount = result
        .iter()
        .map(|item| item.product.price.to_string().parse::<f64>().unwrap() * (item.quantity as f64))
        .sum::<f64>();

    let result = CartUserData {
        count,
        total_amount,
        items: result,
    };

    Ok(HttpResponse::Ok().json(result))
}
