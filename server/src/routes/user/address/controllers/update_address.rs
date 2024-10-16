use super::schema::CreateAddressInput;
use crate::{
    error::HttpError,
    extractors::{auth::Authenticated, validator::ValidatedJson},
    AppState,
};
use actix_web::{
    post,
    web::{self, Path},
    HttpResponse,
};
use sea_orm::{ActiveModelTrait, ColumnTrait, EntityTrait, QueryFilter, Set};
use serde_json::json;

/// Update An Address
#[utoipa::path(
    tag = "Address",
    context_path = "/user/addresses",
    params(
        ("id", description = "Address Id"),
    ),
    request_body(content = CreateAddressInput),
)]
#[post("/{id}")]
pub async fn update_address(
    app_data: web::Data<AppState>,
    id: Path<String>,
    input: ValidatedJson<CreateAddressInput>,
    user: Authenticated,
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let address_id = id.into_inner();
    let user_id = user.id.clone();

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

    let address = entity::address::Entity::find_by_id(address_id)
        .filter(entity::address::Column::UserId.eq(user_id.clone()))
        .one(db)
        .await?;

    if address.is_none() {
        return Err(HttpError::not_found("Address not found"));
    };
    let mut address: entity::address::ActiveModel = address.unwrap().into();
    address.city = Set(city);
    address.first_name = Set(first_name);
    address.full_address = Set(full_address);
    address.landmark = Set(landmark);
    address.last_name = Set(last_name);
    address.phone_number = Set(phone_number);
    address.postal_code = Set(postal_code);
    address.state = Set(state);
    address.user_id = Set(user_id);

    let address = address.update(db).await?;
    let response = json!({
        "message":"Address has been updated",
        "data":address
    });

    Ok(HttpResponse::Ok().json(response))
}
