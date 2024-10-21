use actix_web::{ patch, web::{ self, Path }, HttpResponse };
use extractors::validator::ValidatedJson;
use utils::{ error::HttpError, AppState };
use crate::product_management::products::schema::CreateProductInput;
use sea_orm::{ EntityTrait, Set, ActiveModelTrait };
use super::ProductMessage;

/// Update Product
#[utoipa::path(
    tag = "Product",
    params(("id", description = "Product Id", min_length = 24, max_length = 24)),
    context_path = "/product-management/products",
    responses((status = 200, description = "server information", body = entity::product::Model))
)]
#[patch("/{id}")]
pub async fn update_product(
    app_data: web::Data<AppState>,
    id: Path<String>,
    input: ValidatedJson<CreateProductInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let product_id = id.into_inner();
    let input = input.into_inner();

    // get product
    let product = entity::product::Entity
        ::find_by_id(&product_id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(ProductMessage::ProductNotFound(&product_id)))?;

    let mut product: entity::product::ActiveModel = product.into();

    // update product
    product.title = Set(input.title);
    let product = product.update(db).await?;
    Ok(HttpResponse::Ok().json(product))
}
