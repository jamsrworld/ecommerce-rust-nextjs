use actix_web::{ post, web::{ self }, HttpResponse };
use extractors::auth::Authenticated;
use sea_orm::{ ActiveValue::NotSet, ColumnTrait, EntityTrait, QueryFilter, Set };
use utils::{ db::create_primary_id, error::{ HttpError, ResponseWithMessage }, AppState };

use crate::cart::schema::PlaceOrderSuccessMessage;

/// Place order
#[utoipa::path(
    tag = "Cart",
    context_path = "/carts",
    responses(
        (status = StatusCode::OK, body = PlaceOrderSuccessMessage, description = "No response"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[post("/place_order")]
pub async fn place_order(
    app_data: web::Data<AppState>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let user_id = user.id.to_owned();

    // get user rall cart items
    let cart_items = entity::cart::Entity
        ::find()
        .filter(entity::cart::Column::UserId.eq(&user_id))
        .all(db).await?;

    // convert cart items to checkout items
    let checkout_data = cart_items
        .iter()
        .map(|item| entity::checkout::ActiveModel {
            user_id: Set(user_id.to_owned()),
            product_id: Set(item.product_id.to_owned()),
            quantity: Set(item.quantity.to_owned()),
            id: Set(create_primary_id()),
            created_at: NotSet,
        })
        .collect::<Vec<entity::checkout::ActiveModel>>();

    // delete current checkout items
    entity::checkout::Entity
        ::delete_many()
        .filter(entity::checkout::Column::UserId.eq(&user_id))
        .exec(db).await?;

    // insert into checkout table
    entity::checkout::Entity::insert_many(checkout_data).exec(db).await?;

    let response = PlaceOrderSuccessMessage {
        success: true,
    };

    Ok(HttpResponse::Ok().json(response))
}
