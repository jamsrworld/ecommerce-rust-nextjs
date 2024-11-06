use actix_web::{ patch, web::{ self, Path }, HttpResponse };
use extractors::validator::ValidatedJson;
use utils::{ error::HttpError, AppState };
use crate::product_management::products::dtos::CreateProductInput;
use sea_orm::{ EntityTrait, Set, ActiveModelTrait };
use super::messages::ProductMessage;
use super::dtos::ProductWithMessage;

/// Update Product
#[utoipa::path(
    tag = "Product",
    params(("id", description = "Product Id", min_length = 24, max_length = 24)),
    context_path = "/product-management/products",
    request_body = CreateProductInput,
    responses((status = 200, description = "server information", body = ProductWithMessage))
)]
#[patch("/{id}")]
pub async fn update_product(
    app_data: web::Data<AppState>,
    id: Path<String>,
    input: ValidatedJson<CreateProductInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let product_id = id.into_inner();
    let input = input.into_inner();

    // get product
    let product = entity::product::Entity
        ::find_by_id(&product_id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(ProductMessage::ProductNotFound(&product_id)))?;

    let mut product: entity::product::ActiveModel = product.into();

    let CreateProductInput {
        brand,
        category,
        color,
        description,
        highlights,
        images,
        is_returnable,
        maximum_order,
        minimum_order,
        mrp,
        price,
        seo,
        size,
        sku_id,
        status,
        stock,
        style,
        tags,
        title,
        video,
    } = input;

    // update product
    product.brand = Set(brand);
    product.category = Set(category);
    product.color = Set(color);
    product.description = Set(description);
    product.highlights = Set(highlights);
    product.images = Set(images);
    product.is_returnable = Set(is_returnable);
    product.maximum_order = Set(maximum_order);
    product.minimum_order = Set(minimum_order);
    product.mrp = Set(mrp);
    product.price = Set(price);
    product.seo = Set(seo);
    product.size = Set(size);
    product.sku_id = Set(sku_id);
    product.status = Set(status);
    product.stock = Set(stock);
    product.style = Set(style);
    product.tags = Set(tags);
    product.title = Set(title.clone());
    product.video = Set(video);

    let product = product.update(db).await?;

    let response = ProductWithMessage {
        message: ProductMessage::ProductUpdated(&title).to_string(),
        data: product,
    };
    Ok(HttpResponse::Ok().json(response))
}
