use actix_web::{ get, web::{ self, Path }, HttpResponse };
use extractors::auth::Authenticated;
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use sea_orm::{ ColumnTrait, EntityTrait, QueryFilter, QueryOrder };
use crate::{
    models::RelationProductItem,
    order::{ messages::OrderMessage, schema::OrderWithProduct },
};

/// Get order
#[utoipa::path(
    tag = "Order",
    context_path = "/orders",
    params(("id", description = "Order Id", min_length = 24, max_length = 24)),
    responses(
        (status = StatusCode::OK, body = OrderWithProduct, description = "Order Items"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[get("/{id}")]
pub async fn get_order(
    app_data: web::Data<AppState>,
    id: Path<String>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let user_id = user.id.to_owned();
    let id = id.into_inner();
    let record = entity::order::Entity
        ::find_by_id(&id)
        .filter(entity::order::Column::UserId.eq(user_id))
        .find_also_related(entity::product::Entity)
        .order_by_desc(entity::order::Column::CreatedAt)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(OrderMessage::OrderNotFound(&id)))?;

    let (order, product) = record;
    let product: RelationProductItem = product.unwrap().into();

    let response = OrderWithProduct {
        order,
        product,
    };
    Ok(HttpResponse::Ok().json(response))
}
