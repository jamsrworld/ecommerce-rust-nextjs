use serde::Serialize;

#[derive(Debug, thiserror::Error, Serialize)]
pub enum ProfileMessage {
  #[error("Profile has been updated")]
  ProfileUpdated(),
}

impl Into<String> for ProfileMessage {
  fn into(self) -> String {
    self.to_string()
  }
}
