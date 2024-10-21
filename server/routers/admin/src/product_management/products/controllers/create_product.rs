use actix_web::{ post, web, HttpResponse };
use extractors::validator::ValidatedJson;
use sea_orm::{ EntityTrait, Set };
use utils::{ error::HttpError, AppState };

use crate::product_management::products::schema::CreateProductInput;

/// Create Product
#[utoipa::path(
    tag = "Product",
    context_path = "/product-management/products",
    request_body = CreateProductInput,
    responses((status = 200, description = "product created", body = String))
)]
#[post("")]
pub async fn create_product(
    app_data: web::Data<AppState>,
    input: ValidatedJson<CreateProductInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let input = input.into_inner();

    // create product
    let product_model = entity::product::ActiveModel {
        id: Set(cuid2::create_id()),
        title: Set(input.title),
        product: Set("product".to_string()),
    };
    let product = entity::product::Entity::insert(product_model).exec_with_returning(db).await?;
    Ok(HttpResponse::Ok().json(product))
}
