use actix_web::{ get, post, web::{ self }, HttpResponse };
use entity::sea_orm_active_enums::OrderStatus;
use extractors::{ auth::Authenticated, validator::ValidatedJson };
use utils::{ db::create_primary_id, error::{ HttpError, ResponseWithMessage }, AppState };
use sea_orm::{ ActiveValue::NotSet, ColumnTrait, EntityTrait, QueryFilter, QueryOrder, Set };

use crate::checkout::{ messages::CheckoutMessage, schema::ProceedCheckoutInput };

/// Proceed checkout
#[utoipa::path(
    tag = "Checkout",
    context_path = "/checkouts",
    request_body(content = ProceedCheckoutInput),
    responses(
        (status = StatusCode::OK, body = ResponseWithMessage, description = "Response message"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[post("")]
pub async fn proceed_checkout(
    app_data: web::Data<AppState>,
    input: ValidatedJson<ProceedCheckoutInput>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let input = input.into_inner();
    let db = &app_data.db;
    let user_id = user.id.to_owned();

    let ProceedCheckoutInput { payment_method } = input;

    // get user all checkout items
    let checkout_items = entity::checkout::Entity
        ::find()
        .filter(entity::checkout::Column::UserId.eq(&user_id))
        .order_by_desc(entity::checkout::Column::CreatedAt)
        .all(db).await?;

    // check if checkout items are empty
    if checkout_items.is_empty() {
        return Err(HttpError::bad_request(CheckoutMessage::CheckoutEmpty));
    }

    // convert checkout items to orders items
    let order_items = checkout_items
        .iter()
        .map(|item| {
            entity::order::ActiveModel {
                id: Set(create_primary_id()),
                product_id: Set(item.product_id.to_owned()),
                quantity: Set(item.quantity),
                created_at: NotSet,
                updated_at: NotSet,
                user_id: Set(user_id.to_owned()),
                payment_method: Set(payment_method.to_owned()),
                status: Set(OrderStatus::Success),
            }
        })
        .collect::<Vec<entity::order::ActiveModel>>();

    // create orders
    entity::order::Entity::insert_many(order_items).exec(db).await?;

    // delete checkout items
    entity::checkout::Entity
        ::delete_many()
        .filter(entity::checkout::Column::UserId.eq(&user_id))
        .exec(db).await?;

    let response = ResponseWithMessage {
        message: CheckoutMessage::CheckoutSuccessful.to_string(),
    };
    Ok(HttpResponse::Ok().json(response))
}
