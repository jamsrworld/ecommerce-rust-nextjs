use actix_web::{ get, web::{ self, Path }, HttpResponse };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use sea_orm::EntityTrait;
use super::messages::ProductMessages;

/// Get a Product
#[utoipa::path(
    tag = "Product",
    context_path = "/products",
    params(("id", description = "Product Id", min_length = 24, max_length = 24)),
    responses(
        (status = StatusCode::OK, body = entity::product::Model, description = "Product"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[get("/product/{id}")]
pub async fn get_product(
    app_data: web::Data<AppState>,
    id: Path<String>
) -> Result<HttpResponse, HttpError> {
    let id = id.into_inner();
    let db = &app_data.db;
    let product = entity::product::Entity
        ::find_by_id(&id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(ProductMessages::ProductNotFound(&id).to_string()))?;

    Ok(HttpResponse::Ok().json(product))
}
