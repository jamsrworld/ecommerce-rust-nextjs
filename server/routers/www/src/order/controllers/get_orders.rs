use actix_web::{ get, web::{ self }, HttpResponse };
use extractors::auth::Authenticated;
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use sea_orm::{ ColumnTrait, EntityTrait, QueryFilter, QueryOrder };
use crate::{ models::RelationProductItem, order::schema::OrderWithProduct };

/// Get all orders
#[utoipa::path(
    tag = "Order",
    context_path = "/orders",
    responses(
        (status = StatusCode::OK, body = Vec<OrderWithProduct>, description = "Order Items"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[get("")]
pub async fn get_orders(
    app_data: web::Data<AppState>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let user_id = user.id.to_owned();
    let records = entity::order::Entity
        ::find()
        .filter(entity::order::Column::UserId.eq(user_id))
        .find_also_related(entity::product::Entity)
        .order_by_desc(entity::order::Column::CreatedAt)
        .all(db).await?;

    let result = records
        .into_iter()
        .map(|(item, product)| {
            let product: RelationProductItem = product.unwrap().into();
            OrderWithProduct {
                order: item,
                product,
            }
        })
        .collect::<Vec<OrderWithProduct>>();

    Ok(HttpResponse::Ok().json(result))
}
