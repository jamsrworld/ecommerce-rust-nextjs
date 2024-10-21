use actix_web::{ get, web::{ self, Path }, HttpResponse };
use serde::Serialize;
use utils::{ error::HttpError, AppState };
use sea_orm::EntityTrait;
use utoipa::ToSchema;
use super::CategoryMessage;

#[derive(ToSchema, Serialize)]
pub struct GetCategoryResponse {
    pub data: entity::category::Model,
}

/// Get Category
#[utoipa::path(
    tag = "Category",
    params(("id", description = "Category Id", min_length = 24, max_length = 24)),
    context_path = "/product-management/categories",
    responses((status = 200, description = "category", body = GetCategoryResponse))
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

    let response = GetCategoryResponse { data: category };
    Ok(HttpResponse::Ok().json(response))
}
