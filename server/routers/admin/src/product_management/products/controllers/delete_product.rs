use actix_web::{ delete, web::{ self, Path }, HttpResponse };
use sea_orm::{ EntityTrait, ModelTrait };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use super::messages::ProductMessage;

/// Delete Product
#[utoipa::path(
    tag = "Product",
    params(("id", description = "Product Id", min_length = 24, max_length = 24)),
    context_path = "/product-management/products",
    responses(
        (status = 200, description = "product deleted message", body = ResponseWithMessage),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[delete("/{id}")]
pub async fn delete_product(
    app_data: web::Data<AppState>,
    id: Path<String>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let product_id = id.into_inner();

    // find product
    let product = entity::product::Entity
        ::find_by_id(&product_id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(ProductMessage::ProductNotFound(&product_id)))?;
    let product_name = product.title.clone();
    // delete product
    product.delete(db).await?;

    let response = ResponseWithMessage {
        message: ProductMessage::ProductDeleted(&product_name).to_string(),
    };

    Ok(HttpResponse::Ok().json(response))
}
