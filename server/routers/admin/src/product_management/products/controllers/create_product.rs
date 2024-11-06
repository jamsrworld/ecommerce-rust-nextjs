use actix_web::{ post, web, HttpResponse };
use extractors::validator::ValidatedJson;
use sea_orm::{ ActiveValue::NotSet, EntityTrait, Set };
use utils::{ error::HttpError, AppState };
use super::dtos::{ ProductWithMessage, CreateProductInput };
use super::messages::ProductMessage;

/// Create Product
#[utoipa::path(
    tag = "Product",
    context_path = "/product-management/products",
    request_body = CreateProductInput,
    responses((status = 200, description = "product created", body = ProductWithMessage))
)]
#[post("")]
pub async fn create_product(
    app_data: web::Data<AppState>,
    input: ValidatedJson<CreateProductInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let input = input.into_inner();

    let CreateProductInput {
        title,
        description,
        category,
        brand,
        color,
        size,
        style,
        highlights,
        images,
        is_returnable,
        maximum_order,
        minimum_order,
        mrp,
        price,
        seo,
        sku_id,
        status,
        stock,
        tags,
        video,
    } = input;

    let slug = &title.to_lowercase().replace(" ", "-");

    // create product
    let product_model = entity::product::ActiveModel {
        id: Set(cuid2::create_id()),
        brand: Set(brand),
        category: Set(category),
        color: Set(color),
        created_at: NotSet,
        description: Set(description),
        highlights: Set(highlights),
        images: Set(images),
        is_returnable: Set(is_returnable),
        maximum_order: Set(maximum_order),
        minimum_order: Set(minimum_order),
        mrp: Set(mrp),
        price: Set(price),
        seo: Set(seo),
        size: Set(size),
        sku_id: Set(sku_id),
        slug: Set(slug.to_owned()),
        status: Set(status),
        stock: Set(stock),
        style: Set(style),
        tags: Set(tags),
        title: Set(title.clone()),
        updated_at: NotSet,
        video: Set(video),
    };
    let product = entity::product::Entity::insert(product_model).exec_with_returning(db).await?;

    let response = ProductWithMessage {
        message: ProductMessage::ProductCreated(&title).to_string(),
        data: product,
    };
    Ok(HttpResponse::Ok().json(response))
}
