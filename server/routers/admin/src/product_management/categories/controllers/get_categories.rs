use actix_web::{ get, web, HttpResponse };
use utils::{ error::HttpError, AppState };
use sea_orm::EntityTrait;

/// Get All Categories
#[utoipa::path(
    tag = "Category",
    context_path = "/product-management/categories",
    responses((status = 200, description = "server information", body = Vec<entity::category::Model>))
)]
#[get("")]
pub async fn get_categories(app_data: web::Data<AppState>) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;

    let categories = entity::category::Entity::find().all(db).await?;
    Ok(HttpResponse::Ok().json(categories))
}
