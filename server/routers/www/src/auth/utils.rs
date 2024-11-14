use super::messages::AuthMessage;
use chrono::FixedOffset;
use entity::sea_orm_active_enums::OtpPurpose;
use sea_orm::{ ActiveModelTrait, ColumnTrait, DatabaseConnection, EntityTrait, QueryFilter, Set };
use utils::{ db::create_primary_id, error::HttpError, number::rand_otp };

pub async fn check_unique_email(db: &DatabaseConnection, email: &String) -> Result<(), HttpError> {
    let user = entity::user::Entity
        ::find()
        .filter(entity::user::Column::Email.eq(email.clone()))
        .one(db).await?;

    if user.is_some() {
        return Err(HttpError::conflict(AuthMessage::EmailAlreadyExist(email)));
    }

    Ok(())
}

pub async fn generate_otp(
    db: &DatabaseConnection,
    email: String,
    purpose: OtpPurpose
) -> Result<u16, HttpError> {
    // delete previous otps
    entity::otp::Entity::delete_many().exec(db).await?;

    let otp_code = rand_otp();
    let valid_till = chrono::Utc::now() + chrono::Duration::minutes(10);

    let fixed_offset = FixedOffset::east_opt(0).unwrap(); // UTC offset
    let valid_till_fixed = valid_till.with_timezone(&fixed_offset);

    // create otp
    let new_otp = entity::otp::ActiveModel {
        email: Set(email),
        id: Set(create_primary_id()),
        code: Set(otp_code as i16),
        purpose: Set(purpose),
        valid_till: Set(valid_till_fixed),
    };
    new_otp.insert(db).await?;
    Ok(otp_code)
}

pub async fn verify_otp(
    db: &DatabaseConnection,
    email: &String,
    purpose: OtpPurpose,
    code: u16
) -> Result<(), HttpError> {
    let current_time = chrono::Utc::now();

    entity::otp::Entity
        ::find()
        .filter(
            entity::otp::Column::Email
                .eq(email)
                .and(entity::otp::Column::Purpose.eq(purpose))
                .and(entity::otp::Column::Code.eq(code))
                .and(entity::otp::Column::ValidTill.gte(current_time))
        )
        .one(db).await?
        .ok_or_else(|| HttpError::precondition_failed(AuthMessage::OtpNotRequested))?;

    Ok(())
}

pub async fn delete_otp(
    db: &DatabaseConnection,
    email: &String,
    code: u16
) -> Result<(), HttpError> {
    entity::otp::Entity
        ::delete_many()
        .filter(entity::otp::Column::Email.eq(email).and(entity::otp::Column::Code.eq(code)))
        .exec(db).await?;
    Ok(())
}
