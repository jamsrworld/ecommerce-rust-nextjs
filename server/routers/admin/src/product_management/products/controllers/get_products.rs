use actix_web::{ get, web, HttpResponse };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use sea_orm::EntityTrait;

/// Get All Products
#[utoipa::path(
    tag = "Product",
    context_path = "/product-management/products",
    responses((status = 200, description = "products list", body = Vec<entity::product::Model>),
    (
        status = StatusCode::INTERNAL_SERVER_ERROR,
        body = ResponseWithMessage,
        description = "Internal Server Error",
    ))
)]
#[get("")]
pub async fn get_products(app_data: web::Data<AppState>) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;

    let products = entity::product::Entity::find().all(db).await?;
    Ok(HttpResponse::Ok().json(products))
}
