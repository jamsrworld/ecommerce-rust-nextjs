use actix_web::{ get, web::{ self }, HttpResponse };
use entity::product::ProductImages;
use extractors::auth::Authenticated;
use serde::{ Deserialize, Serialize };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use sea_orm::{ prelude::Decimal, ColumnTrait, EntityTrait, QueryFilter, QueryOrder };
use utoipa::ToSchema;

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct CartProductItem {
    pub id: String,
    pub title: String,
    pub slug: String,
    pub brand: String,
    pub color: String,
    pub size: String,
    pub style: String,
    pub images: ProductImages,
    pub mrp: Decimal,
    pub price: Decimal,
}

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct CartItemsWithProduct {
    id: String,
    product_id: String,
    quantity: i16,
    product: CartProductItem,
}

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct CartUserData {
    count: i64,
    total: f64,
    cart_items: Vec<CartItemsWithProduct>,
}

/// Get all cart items
#[utoipa::path(
    tag = "Cart",
    context_path = "/carts",
    responses(
        (status = StatusCode::OK, body = CartUserData, description = "Cart Items"),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[get("")]
pub async fn get_all_records(
    app_data: web::Data<AppState>,
    user: Authenticated
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let user_id = user.id.to_owned();
    let records = entity::cart::Entity
        ::find()
        .filter(entity::cart::Column::UserId.eq(user_id))
        .find_also_related(entity::product::Entity)
        .order_by_desc(entity::cart::Column::CreatedAt)
        .all(db).await?;

    let result = records
        .into_iter()
        .map(|(cart, product)| {
            let product = product.unwrap();
            CartItemsWithProduct {
                id: cart.id,
                product_id: cart.product_id,
                quantity: cart.quantity,
                product: CartProductItem {
                    brand: product.brand,
                    color: product.color,
                    id: product.id,
                    size: product.size,
                    slug: product.slug,
                    style: product.style,
                    title: product.title,
                    images: product.images,
                    mrp: product.mrp,
                    price: product.price,
                },
            }
        })
        .collect::<Vec<CartItemsWithProduct>>();

    let count = result.len() as i64;
    let total = result
        .iter()
        .map(|item| item.product.price.to_string().parse::<f64>().unwrap() * (item.quantity as f64))
        .sum::<f64>();

    let result = CartUserData {
        count,
        total,
        cart_items: result,
    };

    Ok(HttpResponse::Ok().json(result))
}
