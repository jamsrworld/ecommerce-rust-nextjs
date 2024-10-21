use actix_web::{ get, web, HttpResponse };
use utils::{ error::HttpError, AppState };
use sea_orm::EntityTrait;
use super::AttributeModel;

/// Get All Attributes
#[utoipa::path(
    tag = "Attribute",
    context_path = "/product-management/attributes",
    responses((status = 200, description = "server information", body = Vec<AttributeModel>))
)]
#[get("")]
pub async fn get_attributes(app_data: web::Data<AppState>) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;

    let attributes = entity::attribute::Entity::find().all(db).await?;
    let attributes: Vec<AttributeModel> = attributes
        .into_iter()
        .map(|model| model.into())
        .collect();
    Ok(HttpResponse::Ok().json(attributes))
}
