use actix_web::{ post, web, HttpResponse };
use extractors::validator::ValidatedJson;
use sea_orm::{ EntityTrait, Set };
use utils::{ error::HttpError, AppState };

use crate::product_management::categories::schema::CreateCategoryInput;

/// Create Category
#[utoipa::path(
    tag = "Category",
    context_path = "/product-management/categories",
    request_body = CreateCategoryInput,
    responses((status = 200, description = "category created", body = String))
)]
#[post("")]
pub async fn create_category(
    app_data: web::Data<AppState>,
    input: ValidatedJson<CreateCategoryInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let input = input.into_inner();

    // create category
    let category_model = entity::category::ActiveModel {
        id: Set(cuid2::create_id()),
        title: Set(input.title),
        category: Set("category".to_string()),
    };
    let category = entity::category::Entity::insert(category_model).exec_with_returning(db).await?;
    Ok(HttpResponse::Ok().json(category))
}
