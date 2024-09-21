use super::messages::AuthMessage;
use crate::error::HttpError;
use sea_orm::{ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter};

pub async fn check_unique_username(
    db: &DatabaseConnection,
    username: &String,
) -> Result<(), HttpError> {
    let user = entity::user::Entity::find()
        .filter(entity::user::Column::Username.eq(username))
        .one(db)
        .await
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    if user.is_some() {
        return Err(HttpError::conflict(AuthMessage::UsernameAlreadyExist(
            username,
        )));
    }

    Ok(())
}

pub async fn check_unique_email(db: &DatabaseConnection, email: &String) -> Result<(), HttpError> {
    let user = entity::user::Entity::find()
        .filter(entity::user::Column::Email.eq(email.clone()))
        .one(db)
        .await
        .map_err(|e| HttpError::server_error(e.to_string()))?;

    if user.is_some() {
        return Err(HttpError::conflict(AuthMessage::EmailAlreadyExist(email)));
    }

    Ok(())
}
