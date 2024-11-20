use actix_web::{ post, web::{ self, Path }, HttpResponse };
use extractors::auth::Authenticated;
use utils::{
    db::create_primary_id,
    error::{ HttpError, ResponseWithMessage, ResponseWithSuccess },
    AppState,
};
use sea_orm::{ sea_query, ActiveValue::NotSet, ColumnTrait, EntityTrait, QueryFilter, Set };

/// Checkout Product
#[utoipa::path(
    tag = "Checkout",
    context_path = "/checkouts",
    params(("id", description = "Product Id", min_length = 24, max_length = 24)),
    responses(
        (status = StatusCode::OK, body = ResponseWithSuccess, description = "Response message"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[post("/product/{id}")]
pub async fn checkout_product(
    app_data: web::Data<AppState>,
    product_id: Path<String>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let user_id = user.id.to_owned();
    let product_id = product_id.into_inner();

    // check product exists
    entity::product::Entity
        ::find_by_id(&product_id)
        .one(db).await?
        .ok_or_else(|| { HttpError::not_found("Invalid product") })?;

    // get user all checkout items
    let checkout_item = entity::checkout::ActiveModel {
        id: Set(create_primary_id()),
        user_id: Set(user_id.to_owned()),
        product_id: Set(product_id.to_owned()),
        quantity: Set(1),
        created_at: NotSet,
    };

    // delete checkout items
    entity::checkout::Entity
        ::delete_many()
        .filter(entity::checkout::Column::UserId.eq(&user_id))
        .exec(db).await?;

    // add product to checkout
    entity::checkout::Entity
        ::insert(checkout_item)
        .on_conflict(
            sea_query::OnConflict
                ::columns([entity::checkout::Column::UserId, entity::checkout::Column::ProductId])
                .do_nothing()
                .to_owned()
        )
        .exec(db).await?;

    let response = ResponseWithSuccess {
        success: true,
    };
    Ok(HttpResponse::Ok().json(response))
}
