use actix_web::{ post, web, HttpResponse };
use extractors::validator::ValidatedJson;
use sea_orm::{ ActiveValue::NotSet, EntityTrait, QueryFilter, Set, ColumnTrait };
use serde_json::json;
use utils::db::create_primary_id;
use utils::{ error::HttpError, AppState };
use super::AttributeMessage;
use super::AttributeModel;
use super::schema::{ CreateAttributeInput, AttributeWithMessage };

/// Create Attribute
#[utoipa::path(
    tag = "Attribute",
    context_path = "/product-management/attributes",
    request_body = CreateAttributeInput,
    responses((status = 200, description = "attribute created", body = AttributeWithMessage))
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
    let is_attribute = entity::attribute::Entity
        ::find()
        .filter(entity::attribute::Column::Name.eq(&input.name))
        .one(db).await?
        .is_some();

    if is_attribute {
        return Err(HttpError::conflict(AttributeMessage::AttributeAlreadyExists(&input.name)));
    }

    // check if attribute value exists
    let json_values = values
        .into_iter()
        .map(|attr| json!(attr))
        .collect();

    // create attribute
    let attribute_model = entity::attribute::ActiveModel {
        id: Set(create_primary_id()),
        name: Set(input.name),
        values: Set(json_values),
        is_active: Set(false),
        created_at: NotSet,
    };

    let attribute = entity::attribute::Entity
        ::insert(attribute_model)
        .exec_with_returning(db).await?;
    let attribute: AttributeModel = attribute.into();

    let response = AttributeWithMessage {
        message: AttributeMessage::AttributeCreated(&attribute.name).to_string(),
        data: attribute,
    };

    Ok(HttpResponse::Ok().json(response))
}
