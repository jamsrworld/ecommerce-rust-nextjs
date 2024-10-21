use actix_web::{ delete, web::{ self, Path }, HttpResponse };
use sea_orm::{ EntityTrait, ModelTrait };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };
use super::AttributeMessage;

/// Delete Attribute
#[utoipa::path(
    tag = "Attribute",
    params(("id", description = "Attribute Id", min_length = 24, max_length = 24)),
    context_path = "/product-management/attributes",
    responses((status = 200, description = "attribute deleted", body = ResponseWithMessage))
)]
#[delete("/{id}")]
pub async fn delete_attribute(
    app_data: web::Data<AppState>,
    id: Path<String>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let attribute_id = id.into_inner();

    // find attribute
    let attribute = entity::attribute::Entity
        ::find_by_id(&attribute_id)
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(AttributeMessage::AttributeNotFound(&attribute_id)))?;
    let attribute_name = attribute.name.clone();
    // delete attribute
    attribute.delete(db).await?;

    let response = ResponseWithMessage {
        message: AttributeMessage::AttributeDeleted(&attribute_name).to_string(),
    };
    Ok(HttpResponse::Ok().json(response))
}
