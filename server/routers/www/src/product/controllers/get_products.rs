use actix_web::{ get, web, HttpResponse };
use sea_orm::EntityTrait;
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };

/// Get all Products
#[utoipa::path(
    tag = "Product",
    context_path = "/products",
    responses(
        (status = StatusCode::OK, body = Vec<entity::product::Model>, description = "All products"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[get("")]
pub async fn get_products(app_data: web::Data<AppState>) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let products = entity::product::Entity::find().all(db).await?;
    Ok(HttpResponse::Ok().json(products))
}
