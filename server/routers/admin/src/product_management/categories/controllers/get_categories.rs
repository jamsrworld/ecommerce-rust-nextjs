use actix_web::{ get, web, HttpResponse };
use serde::Serialize;
use utils::{ error::HttpError, AppState };
use utoipa::ToSchema;
use sea_orm::EntityTrait;

#[derive(ToSchema, Serialize)]
pub struct GetCategoriesResponse {
    data: Vec<entity::category::Model>,
}

/// Get All Categories
#[utoipa::path(
    tag = "Category",
    context_path = "/product-management/categories",
    responses((status = 200, description = "server information", body = GetCategoriesResponse))
)]
#[get("")]
pub async fn get_categories(app_data: web::Data<AppState>) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;

    let categories = entity::category::Entity::find().all(db).await?;
    let response = GetCategoriesResponse {
        data: categories,
    };
    Ok(HttpResponse::Ok().json(response))
}
