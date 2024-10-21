use actix_web::{ patch, web::{ self, Path }, HttpResponse };
use extractors::validator::ValidatedJson;
use utils::{ error::HttpError, AppState };
use crate::product_management::categories::schema::CreateCategoryInput;
use super::get_category::GetCategoryResponse;
use sea_orm::{ EntityTrait, Set, ActiveModelTrait };
use super::CategoryMessage;

/// Update Category
#[utoipa::path(
    tag = "Category",
    params(("id", description = "Category Id", min_length = 24, max_length = 24)),
    context_path = "/product-management/categories",
    responses((status = 200, description = "server information", body = GetCategoryResponse))
)]
#[patch("/{id}")]
pub async fn update_category(
    app_data: web::Data<AppState>,
    id: Path<String>,
    input: ValidatedJson<CreateCategoryInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let category_id = id.into_inner();
    let input = input.into_inner();

    // get category
    let category = entity::category::Entity
        ::find_by_id(&category_id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(CategoryMessage::CategoryNotFound(&category_id)))?;

    let mut category: entity::category::ActiveModel = category.into();

    // update category
    category.title = Set(input.title);
    let category = category.update(db).await?;

    let response: GetCategoryResponse = GetCategoryResponse {
        data: category,
    };

    Ok(HttpResponse::Ok().json(response))
}
