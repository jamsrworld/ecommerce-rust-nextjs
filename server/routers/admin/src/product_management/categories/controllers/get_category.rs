use actix_web::{ get, web::{ self, Path }, HttpResponse };
use utils::{ error::HttpError, AppState };
use sea_orm::EntityTrait;
use super::CategoryMessage;

/// Get Category
#[utoipa::path(
    tag = "Category",
    params(("id", description = "Category Id", min_length = 24, max_length = 24)),
    context_path = "/product-management/categories",
    responses((status = 200, description = "category", body = entity::category::Model))
)]
#[get("/{id}")]
pub async fn get_category(
    app_data: web::Data<AppState>,
    id: Path<String>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let category_id = id.into_inner();

    // get category
    let category = entity::category::Entity
        ::find_by_id(&category_id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(CategoryMessage::CategoryNotFound(&category_id)))?;
    Ok(HttpResponse::Ok().json(category))
}
