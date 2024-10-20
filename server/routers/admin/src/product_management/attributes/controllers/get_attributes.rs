use actix_web::{ get, web, HttpResponse };
use serde::Serialize;
use utils::{ error::HttpError, AppState };
use utoipa::ToSchema;
use sea_orm::EntityTrait;

#[derive(ToSchema, Serialize)]
pub struct GetAttributesResponse {
    data: Vec<entity::attribute::Model>,
}

/// Get All Attributes
#[utoipa::path(
    tag = "Attribute",
    context_path = "/product-management/attributes",
    responses((status = 200, description = "server information", body = GetAttributesResponse))
)]
#[get("")]
pub async fn get_attributes(app_data: web::Data<AppState>) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;

    let attributes = entity::attribute::Entity::find().all(db).await?;
    let response = GetAttributesResponse {
        data: attributes,
    };
    Ok(HttpResponse::Ok().json(response))
}
