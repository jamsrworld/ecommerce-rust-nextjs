use actix_web::{ get, web::{ self, Path }, HttpResponse };
use serde::Serialize;
use utils::{ error::HttpError, AppState };
use sea_orm::EntityTrait;
use utoipa::ToSchema;
use super::AttributeMessage;

#[derive(ToSchema, Serialize)]
pub struct GetAttributeResponse {
    pub data: entity::attribute::Model,
}

/// Get Attribute
#[utoipa::path(
    tag = "Attribute",
    params(("id", description = "Attribute Id", min_length = 24, max_length = 24)),
    context_path = "/product-management/attributes",
    responses((status = 200, description = "attribute", body = GetAttributeResponse))
)]
#[get("/{id}")]
pub async fn get_attribute(
    app_data: web::Data<AppState>,
    id: Path<String>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let attribute_id = id.into_inner();

    // get attribute
    let attribute = entity::attribute::Entity
        ::find_by_id(&attribute_id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(AttributeMessage::AttributeNotFound(&attribute_id)))?;

    let response = GetAttributeResponse { data: attribute };
    Ok(HttpResponse::Ok().json(response))
}
