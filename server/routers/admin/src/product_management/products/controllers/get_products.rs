use actix_web::{ get, web, HttpResponse };
use serde::Serialize;
use utils::{ error::HttpError, AppState };
use utoipa::ToSchema;
use sea_orm::EntityTrait;

#[derive(ToSchema, Serialize)]
pub struct GetProductsResponse {
    data: Vec<entity::product::Model>,
}

/// Get All Products
#[utoipa::path(
    tag = "Product",
    context_path = "/product-management/products",
    responses((status = 200, description = "server information", body = GetProductsResponse))
)]
#[get("")]
pub async fn get_products(app_data: web::Data<AppState>) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;

    let products = entity::product::Entity::find().all(db).await?;
    let response = GetProductsResponse {
        data: products,
    };
    Ok(HttpResponse::Ok().json(response))
}
