use super::messages::AddressMessage;
use super::schema::CreateAddressInput;
use super::utils::check_address_limit;
use actix_web::{ post, web, HttpResponse };
use extractors::{ auth::Authenticated, validator::ValidatedJson };
use sea_orm::{ ActiveValue::NotSet, EntityTrait, Set };
use utils::{ db::create_primary_id, error::{ HttpError, ResponseWithMessage }, AppState };
use super::schema::AddressWithMessage;

/// Create An Address
#[utoipa::path(
    tag = "Address",
    context_path = "/addresses",
    request_body = CreateAddressInput,
    responses(
        (status = StatusCode::CREATED, body = AddressWithMessage, description = "Address Created"),
        (
            status = StatusCode::TOO_MANY_REQUESTS,
            body = ResponseWithMessage,
            description = "Address Limit Reached",
        ),
        (
            status = StatusCode::INTERNAL_SERVER_ERROR,
            body = ResponseWithMessage,
            description = "Internal Server Error",
        )
    )
)]
#[post("")]
pub async fn create_address(
    app_data: web::Data<AppState>,
    input: ValidatedJson<CreateAddressInput>,
    user: Authenticated
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

    // validate if user reached address limit
    check_address_limit(db, user_id.clone()).await?;

    // create new address
    let id = create_primary_id();
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
    let new_address = entity::address::Entity
        ::insert(new_address_model)
        .exec_with_returning(db).await?;

    let response = AddressWithMessage {
        message: AddressMessage::AddressCreated.to_string(),
        data: new_address,
    };
    Ok(HttpResponse::Created().json(response))
}
