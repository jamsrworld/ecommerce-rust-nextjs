use actix_web::{ delete, web::{ self, Path }, HttpResponse };
use sea_orm::{ EntityTrait, ModelTrait };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use super::CategoryMessage;

/// Delete Category
#[utoipa::path(
    tag = "Category",
    params(("id", description = "Category Id", min_length = 24, max_length = 24)),
    context_path = "/product-management/categories",
    responses((status = 200, description = "category deleted", body = ResponseWithMessage))
)]
#[delete("/{id}")]
pub async fn delete_category(
    app_data: web::Data<AppState>,
    id: Path<String>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let category_id = id.into_inner();

    // find category
    let category = entity::category::Entity
        ::find_by_id(&category_id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(CategoryMessage::CategoryNotFound(&category_id)))?;
    let category_name = category.title.clone();
    // delete category
    category.delete(db).await?;

    let response = ResponseWithMessage {
        message: CategoryMessage::CategoryDeleted(&category_name).to_string(),
    };

    Ok(HttpResponse::Ok().json(response))
}
