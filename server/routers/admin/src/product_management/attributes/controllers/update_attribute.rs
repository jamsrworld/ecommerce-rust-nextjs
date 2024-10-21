use actix_web::{ patch, web::{ self, Path }, HttpResponse };
use extractors::validator::ValidatedJson;
use serde_json::json;
use utils::{ error::HttpError, AppState };
use crate::product_management::attributes::schema::CreateAttributeInput;
use sea_orm::{ EntityTrait, Set, ActiveModelTrait };
use super::AttributeMessage;

/// Update Attribute
#[utoipa::path(
    tag = "Attribute",
    params(("id", description = "Attribute Id", min_length = 24, max_length = 24)),
    context_path = "/product-management/attributes",
    responses((status = 200, description = "server information", body = entity::attribute::Model))
)]
#[patch("/{id}")]
pub async fn update_attribute(
    app_data: web::Data<AppState>,
    id: Path<String>,
    input: ValidatedJson<CreateAttributeInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let attribute_id = id.into_inner();
    let input = input.into_inner();
    let values = &input.values;

    // get attribute
    let attribute = entity::attribute::Entity
        ::find_by_id(&attribute_id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(AttributeMessage::AttributeNotFound(&attribute_id)))?;

    let mut attribute: entity::attribute::ActiveModel = attribute.into();

    let json_values = values
        .into_iter()
        .map(|attr| json!(attr))
        .collect();

    // update attribute
    attribute.name = Set(input.name);
    attribute.values = Set(json_values);
    let attribute = attribute.update(db).await?;
    Ok(HttpResponse::Ok().json(attribute))
}
