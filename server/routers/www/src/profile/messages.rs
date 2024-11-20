use serde::Serialize;

#[derive(Debug, thiserror::Error, Serialize)]
pub enum ProfileMessage<'a> {
    #[error("Profile has been updated")]
    ProfileUpdated,
    #[error("User not found: {0}")]
    UserNotFound(&'a str),
    #[error("Incorrect password")]
    IncorrectPassword,
    #[error("Password change success")]
    PasswordChangeSuccess
}

impl<'a> Into<String> for ProfileMessage<'a> {
    fn into(self) -> String {
        self.to_string()
    }
}
