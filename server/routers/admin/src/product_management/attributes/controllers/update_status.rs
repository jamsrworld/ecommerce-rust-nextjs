use actix_web::{ patch, web::{ self, Json, Path }, HttpResponse };
use utils::{ error::HttpError, AppState };
use sea_orm::{ EntityTrait, Set, ActiveModelTrait };
use super::{ AttributeMessage, AttributeModel, dtos::UpdateAttributeResponseDto };
use super::dtos::UpdateAttributeStatusInputDto;

/// Update Attribute Status
#[utoipa::path(
    tag = "Attribute",
    params(("id", description = "Attribute Id", min_length = 24, max_length = 24)),
    context_path = "/product-management/attributes",
    responses((status = 200, description = "status updated", body = UpdateAttributeResponseDto))
)]
#[patch("/{id}/status")]
pub async fn update_attribute_status(
    app_data: web::Data<AppState>,
    id: Path<String>,
    input: Json<UpdateAttributeStatusInputDto>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let attribute_id = id.into_inner();
    let input = input.into_inner();

    // get attribute
    let attribute = entity::attribute::Entity
        ::find_by_id(&attribute_id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(AttributeMessage::AttributeNotFound(&attribute_id)))?;
    let mut attribute: entity::attribute::ActiveModel = attribute.into();

    // update attribute
    attribute.is_active = Set(input.is_active);
    let attribute = attribute.update(db).await?;
    let attribute: AttributeModel = attribute.into();

    let status = if attribute.is_active { "enabled" } else { "disabled" };
    let response = UpdateAttributeResponseDto {
        message: AttributeMessage::AttributeStatusUpdated(&attribute.name, status).to_string(),
        data: attribute,
    };
    Ok(HttpResponse::Ok().json(response))
}
