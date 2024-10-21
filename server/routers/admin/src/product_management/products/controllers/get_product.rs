use actix_web::{ get, web::{ self, Path }, HttpResponse };
use utils::{ error::HttpError, AppState };
use sea_orm::EntityTrait;
use super::ProductMessage;

/// Get Product
#[utoipa::path(
    tag = "Product",
    params(("id", description = "Product Id", min_length = 24, max_length = 24)),
    context_path = "/product-management/products",
    responses((status = 200, description = "product", body = entity::product::Model))
)]
#[get("/{id}")]
pub async fn get_product(
    app_data: web::Data<AppState>,
    id: Path<String>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let product_id = id.into_inner();

    // get product
    let product = entity::product::Entity
        ::find_by_id(&product_id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(ProductMessage::ProductNotFound(&product_id)))?;
    Ok(HttpResponse::Ok().json(product))
}
