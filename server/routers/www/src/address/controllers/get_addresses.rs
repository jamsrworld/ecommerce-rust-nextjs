use actix_web::{ get, web, HttpResponse };
use extractors::auth::Authenticated;
use sea_orm::{ ColumnTrait, EntityTrait, QueryFilter, QueryOrder };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };

/// Get All Addresses
#[utoipa::path(
    tag = "Address",
    context_path = "/addresses",
    responses(
        (status = StatusCode::OK, body = Vec<entity::address::Model>, description = "Addresses"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[get("")]
pub async fn get_addresses(
    app_data: web::Data<AppState>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let user_id = user.id.clone();

    let addresses = entity::address::Entity
        ::find()
        .filter(entity::address::Column::UserId.eq(user_id))
        .order_by_desc(entity::address::Column::IsDefault)
        .order_by_desc(entity::address::Column::CreatedAt)
        .all(db).await?;

    Ok(HttpResponse::Ok().json(addresses))
}
