use entity::sea_orm_active_enums::PaymentMethod;
use serde::{ Deserialize, Serialize };
use utoipa::ToSchema;
use validator::Validate;

#[derive(Debug, Deserialize, Serialize, Validate, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct ProceedCheckoutInput {
    pub payment_method: PaymentMethod,
    pub address_id: String,
}
