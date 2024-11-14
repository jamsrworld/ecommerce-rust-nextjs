use actix_web::{ get, web::{ self }, HttpResponse };
use extractors::auth::Authenticated;
use serde::{ Deserialize, Serialize };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use sea_orm::{ ColumnTrait, EntityTrait, QueryFilter, QueryOrder };
use utoipa::ToSchema;

use crate::models::RelationProductItem;

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct CheckoutItemsWithProduct {
    id: String,
    product_id: String,
    quantity: i16,
    product: RelationProductItem,
}

#[derive(Debug, Serialize, Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct CheckoutUserData {
    count: i64,
    total_amount: f64,
    items: Vec<CheckoutItemsWithProduct>,
}

/// Get all checkout items
#[utoipa::path(
    tag = "Checkout",
    context_path = "/checkouts",
    responses(
        (status = StatusCode::OK, body = CheckoutUserData, description = "Checkout Items"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[get("")]
pub async fn get_checkout_data(
    app_data: web::Data<AppState>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let user_id = user.id.to_owned();
    let records = entity::checkout::Entity
        ::find()
        .filter(entity::checkout::Column::UserId.eq(user_id))
        .find_also_related(entity::product::Entity)
        .order_by_desc(entity::checkout::Column::CreatedAt)
        .all(db).await?;

    let result = records
        .into_iter()
        .map(|(checkout, product)| {
            let product: RelationProductItem = product.unwrap().into();
            CheckoutItemsWithProduct {
                id: checkout.id,
                product_id: checkout.product_id,
                quantity: checkout.quantity,
                product,
            }
        })
        .collect::<Vec<CheckoutItemsWithProduct>>();

    let count = result.len() as i64;
    let total_amount = result
        .iter()
        .map(|item| item.product.price.to_string().parse::<f64>().unwrap() * (item.quantity as f64))
        .sum::<f64>();

    let result = CheckoutUserData {
        count,
        total_amount,
        items: result,
    };

    Ok(HttpResponse::Ok().json(result))
}
