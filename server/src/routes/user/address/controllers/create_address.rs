use super::schema::CreateAddressInput;
use crate::{
    error::HttpError,
    extractors::{auth::Authenticated, validator::ValidatedJson},
    AppState,
};
use actix_web::{post, web, HttpResponse};
use sea_orm::{ActiveValue::NotSet, EntityTrait, Set};
use serde_json::json;

/// Create An Address
#[utoipa::path(
    tag = "Address",
    context_path = "/user/addresses", 
    request_body(content = CreateAddressInput)
)]
#[post("/create")]
pub async fn create_address(
    app_data: web::Data<AppState>,
    input: ValidatedJson<CreateAddressInput>,
    user: Authenticated,
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let CreateAddressInput {
        city,
        first_name,
        full_address,
        landmark,
        last_name,
        phone_number,
        postal_code,
        state,
    } = input.into_inner();
    let user_id = user.id.clone();

    // create new address
    let id = cuid2::create_id();
    let new_address_model = entity::address::ActiveModel {
        id: Set(id),
        city: Set(city),
        first_name: Set(first_name),
        full_address: Set(full_address),
        landmark: Set(landmark),
        last_name: Set(last_name),
        phone_number: Set(phone_number),
        state: Set(state),
        user_id: Set(user_id),
        created_at: NotSet,
        is_default: Set(false),
        postal_code: Set(postal_code),
    };
    let new_address = entity::address::Entity::insert(new_address_model)
        .exec_with_returning(db)
        .await?;

    let response = json!({
        "message": "Address has been created".to_string(),
        "data": new_address,
    });

    Ok(HttpResponse::Created().json(response))
}
