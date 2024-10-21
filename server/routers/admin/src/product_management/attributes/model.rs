use serde_json::from_value;
use utoipa::ToSchema;
use super::dtos::AttributeValue;

#[derive(ToSchema, Debug)]
#[derive(serde::Serialize)]
#[serde(rename_all = "camelCase")]
pub struct AttributeModel {
    pub id: String,
    pub name: String,
    pub values: Vec<AttributeValue>,
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
            id: self.id.to_string(),
            name: self.name.to_owned(),
            values: original_values,
            created_at: self.created_at.to_owned(),
        }
    }
}
