use actix_web::{ post, web, HttpResponse };
use extractors::validator::ValidatedJson;
use sea_orm::{ ActiveValue::NotSet, EntityTrait, QueryFilter, Set, ColumnTrait };
use serde_json::json;
use utils::{ error::HttpError, AppState };
use super::AttributeMessage;
use super::AttributeModel;
use super::schema::CreateAttributeInput;

/// Create Attribute
#[utoipa::path(
    tag = "Attribute",
    context_path = "/product-management/attributes",
    request_body = CreateAttributeInput,
    responses((status = 200, description = "attribute created", body = AttributeModel))
)]
#[post("")]
pub async fn create_attribute(
    app_data: web::Data<AppState>,
    input: ValidatedJson<CreateAttributeInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let input = input.into_inner();
    let values = &input.values;

    // check if attribute exists
    let attribute = entity::attribute::Entity
        ::find()
        .filter(entity::attribute::Column::Name.eq(&input.name))
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(AttributeMessage::AttributeNotFound(&input.name)))?;
    // check if attribute value exists

    let json_values = values
        .into_iter()
        .map(|attr| json!(attr))
        .collect();

    // create attribute
    let attribute_model = entity::attribute::ActiveModel {
        id: Set(cuid2::create_id()),
        name: Set(input.name),
        values: Set(json_values),
        created_at: NotSet,
    };

    let attribute = entity::attribute::Entity
        ::insert(attribute_model)
        .exec_with_returning(db).await?;
    let response: AttributeModel = attribute.into();

    Ok(HttpResponse::Ok().json(response))
}
