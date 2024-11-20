use actix_web::{ get, web::{ self }, HttpResponse };
use extractors::auth::Authenticated;
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use sea_orm::{ ColumnTrait, EntityTrait, PaginatorTrait, QueryFilter, QueryOrder, QuerySelect };
use validator::Validate;
use crate::{
    models::RelationProductItem,
    order::schema::{ OrderWithPagination, OrderWithProduct },
    schemas::PaginationQuery,
};

/// Get all orders
#[utoipa::path(
    tag = "Order",
    context_path = "/orders",
    params(
        PaginationQuery
    ),
    responses(
        (status = StatusCode::OK, body = OrderWithPagination, description = "Order Items"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[get("")]
pub async fn get_orders(
    query: web::Query<PaginationQuery>,
    app_data: web::Data<AppState>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let query = query.into_inner();
    query.validate().map_err(|err| HttpError::bad_request(err.to_string()))?;

    let db = &app_data.db;
    let user_id = user.id.to_owned();

    let page: u64 = query.page.unwrap_or(1).into();
    let page_size: u64 = query.page_size.unwrap_or(10).into();

    let total_records_count = entity::order::Entity
        ::find()
        .filter(entity::order::Column::UserId.eq(&user_id))
        .count(db).await?;

    let records = entity::order::Entity
        ::find()
        .filter(entity::order::Column::UserId.eq(&user_id))
        .find_also_related(entity::product::Entity)
        .order_by_desc(entity::order::Column::CreatedAt)
        .offset((page - 1) * page_size)
        .limit(page_size)
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

    let response = OrderWithPagination {
        orders: result,
        total_records: total_records_count,
    };

    Ok(HttpResponse::Ok().json(response))
}
