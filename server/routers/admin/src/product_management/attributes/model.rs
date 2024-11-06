use serde_json::from_value;
use utoipa::ToSchema;
use super::schema::AttributeValue;

#[derive(ToSchema, Debug)]
#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AttributeModel {
    pub id: String,
    pub name: String,
    pub values: Vec<AttributeValue>,
    pub is_active: bool,
    pub created_at: chrono::DateTime<chrono::FixedOffset>,
}

impl Into<AttributeModel> for entity::attribute::Model {
    fn into(self) -> AttributeModel {
        let original_values: Vec<AttributeValue> = self.values
            .clone()
            .into_iter()
            .map(|json_value| from_value(json_value).unwrap())
            .collect();
        AttributeModel {
            id: self.id,
            name: self.name,
            is_active: self.is_active,
            values: original_values,
            created_at: self.created_at,
        }
    }
}
