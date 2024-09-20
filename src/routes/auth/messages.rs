#[derive(thiserror::Error, Debug)]
pub enum AuthMessage {
    #[error("Login Successful")]
    LoginSuccessful,
    #[error("No account is registered with this email: {0}")]
    UserNotFound(String),
    #[error("Password incorrect")]
    PasswordIncorrect,
}
