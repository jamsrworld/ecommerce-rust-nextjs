use super::messages::AddressMessage;
use crate::{
    error::{HttpError, ResponseWithMessage},
    extractors::auth::Authenticated,
    AppState,
};
use actix_web::{
    delete,
    web::{self, Path},
    HttpResponse,
};
use sea_orm::{ColumnTrait, EntityTrait, ModelTrait, QueryFilter};

/// Delete An Address
#[utoipa::path(
    tag = "Address",
    context_path = "/user/addresses",
    params(
    ("id", description = "Address Id"),
    ),
    responses(
        (status=StatusCode::OK, body = ResponseWithMessage),
        (status=StatusCode::NOT_FOUND, body = ResponseWithMessage),
        (status=StatusCode::INTERNAL_SERVER_ERROR, body = ResponseWithMessage),
    )
)
]
#[delete("/{id}")]
pub async fn delete_address(
    app_data: web::Data<AppState>,
    id: Path<String>,
    user: Authenticated,
) -> Result<HttpResponse, HttpError> {
    let db = &app_data.db;
    let address_id = id.into_inner();
    let user_id = user.id.clone();

    // find address
    let address = entity::address::Entity::find_by_id(&address_id)
        .filter(entity::address::Column::UserId.eq(user_id))
        .one(db)
        .await?
        .ok_or_else(|| HttpError::not_found(AddressMessage::AddressNotFound(&address_id)))?;
    // delete address
    address.delete(db).await?;

    let response = ResponseWithMessage {
        message: AddressMessage::AddressDeleted.to_string(),
    };
    Ok(HttpResponse::Ok().json(response))
}
