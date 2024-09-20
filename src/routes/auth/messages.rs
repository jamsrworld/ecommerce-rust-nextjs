#[derive(thiserror::Error, Debug)]
pub enum AuthMessage {
    #[error("Login successful.")]
    LoginSuccessful,

    #[error("No account registered with the email: {0}. Please check your email and try again.")]
    UserNotFound(String),

    #[error("The password you entered is incorrect. Please try again.")]
    IncorrectPassword,

    #[error("This account does not use a password. Please use an alternative login method.")]
    NonPasswordAccount,

    #[error("Username already exists: {0}.")]
    UsernameAlreadyExist(String),

    #[error("Email already exists: {0}.")]
    EmailAlreadyExist(String),
}

impl Into<String> for AuthMessage {
    fn into(self) -> String {
        self.to_string()
    }
}
