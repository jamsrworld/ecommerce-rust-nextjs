use actix_web::{ post, web, HttpResponse };
use extractors::validator::ValidatedJson;
use sea_orm::{ ActiveValue::NotSet, EntityTrait, Set };
use serde_json::json;
use utils::{ error::HttpError, AppState };

use crate::product_management::attributes::schema::CreateAttributeInput;

/// Create Attribute
#[utoipa::path(
    tag = "Attribute",
    context_path = "/product-management/attributes",
    request_body = CreateAttributeInput,
    responses((status = 200, description = "attribute created", body = entity::attribute::Model))
)]
#[post("")]
pub async fn create_attribute(
    app_data: web::Data<AppState>,
    input: ValidatedJson<CreateAttributeInput>
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let input = input.into_inner();
    let values = &input.values;

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
    Ok(HttpResponse::Ok().json(attribute))
}
