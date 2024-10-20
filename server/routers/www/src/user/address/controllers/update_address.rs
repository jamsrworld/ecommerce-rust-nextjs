use super::create_address::CreateAddressResponse;
use super::messages::AddressMessage;
use super::schema::CreateAddressInput;
use actix_web::{ patch, web::{ self, Path }, HttpResponse };
use extractors::{ auth::Authenticated, validator::ValidatedJson };
use sea_orm::{ ActiveModelTrait, ColumnTrait, EntityTrait, QueryFilter, Set };
use utils::{ error::{ HttpError, ResponseWithMessage }, AppState };

/// Update An Address
#[utoipa::path(
    tag = "Address",
    context_path = "/user/addresses",
    params(("id", description = "Address Id", min_length = 24, max_length = 24)),
    request_body(content = CreateAddressInput),
    responses(
        (status = StatusCode::OK, body = CreateAddressResponse, description = "Address Updated"),
        (
            status = StatusCode::NOT_FOUND,
            body = ResponseWithMessage,
            description = "Address Not Found",
        ),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[patch("/{id}")]
pub async fn update_address(
    app_data: web::Data<AppState>,
    id: Path<String>,
    input: ValidatedJson<CreateAddressInput>,
    user: Authenticated
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

    let address = entity::address::Entity
        ::find_by_id(&address_id)
        .filter(entity::address::Column::UserId.eq(&user_id))
        .one(db).await?
        .ok_or_else(|| HttpError::not_found(AddressMessage::AddressNotFound(&address_id)))?;

    let mut address: entity::address::ActiveModel = address.into();
    address.city = Set(city);
    address.first_name = Set(first_name);
    address.full_address = Set(full_address);
    address.landmark = Set(landmark);
    address.last_name = Set(last_name);
    address.phone_number = Set(phone_number);
    address.postal_code = Set(postal_code);
    address.state = Set(state);

    let address = address.update(db).await?;
    let message = AddressMessage::AddressUpdated.to_string();

    let response: CreateAddressResponse = CreateAddressResponse {
        message,
        data: address,
    };
    Ok(HttpResponse::Ok().json(response))
}
