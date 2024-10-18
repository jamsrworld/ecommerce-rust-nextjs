use super::messages::AddressMessage;
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, PaginatorTrait, QueryFilter};
use utils::error::HttpError;

const ADDRESS_LIMIT: u64 = 3;
pub async fn check_address_limit(
    db: &DatabaseConnection,
    user_id: String,
) -> Result<(), HttpError> {
    let count = entity::address::Entity::find()
        .filter(entity::address::Column::UserId.eq(user_id))
        .count(db)
        .await?;

    if count >= ADDRESS_LIMIT {
        return Err(HttpError::too_many_requests(
            AddressMessage::AddressLimitReached(ADDRESS_LIMIT),
        ));
    }

    Ok(())
}
