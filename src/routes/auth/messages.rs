#[derive(thiserror::Error, Debug)]
pub enum AuthMessage<'a> {
    #[error("Login successful.")]
    LoginSuccessful,

    #[error("No account registered with the email: {0}. Please check your email and try again.")]
    UserNotFound(&'a str),

    #[error("The password you entered is incorrect. Please try again.")]
    IncorrectPassword,

    #[error("This account does not use a password. Please use an alternative login method.")]
    NonPasswordAccount,

    #[error("Username already exists: {0}.")]
    UsernameAlreadyExist(&'a str),

    #[error("Email already exists: {0}.")]
    EmailAlreadyExist(&'a str),
}

impl<'a> Into<String> for AuthMessage<'a> {
    fn into(self) -> String {
        self.to_string()
    }
}
