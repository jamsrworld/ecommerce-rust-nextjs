#[derive(Debug, thiserror::Error)]
pub enum Messages<'a> {
    // addresses
    #[error("Address not found: {0}.")]
    AddressNotFound(&'a str),
    #[error("Address updated successfully.")]
    AddressUpdated,
    #[error("Address deleted successfully.")]
    AddressDeleted,
    #[error("Address marked as default successfully.")]
    AddressMarkedAsDefault,
    #[error("Address created successfully.")]
    AddressCreated,
    #[error("You can create maximum {0} addresses.")]
    AddressLimitReached(u64),

    // auth
    #[error("Login successful.")]
    LoginSuccessful,
    #[error("No account registered with the email: {0}. Please check your email and try again.")]
    UserNotFound(&'a str),
    #[error("Invalid password. Please verify your credentials and try again.")]
    IncorrectPassword,
    #[error("This account does not use a password. Please use an alternative login method.")]
    NonPasswordAccount,
    #[error("Email already exists: {0}")]
    EmailAlreadyExist(&'a str),
    #[error("Otp has been sent to your email.")]
    OtpSentSuccessfully,
    #[error("Otp has not requested or has been expired.")]
    OtpNotRequested,
    #[error("Registration successful.")]
    RegisterSuccess,
    #[error("Password has been reset successfully.")]
    ResetPasswordSuccess,
    #[error("Logout successful.")]
    LogoutSuccessful,

    // cart
    #[error("Cart Item not found: {0}")]
    CartItemNotFound(&'a str),
    #[error("Cart Item removed: {0}")]
    CartItemRemoved(&'a str),
    #[error("Cart Item updated: {0}")]
    CartItemUpdated(&'a str),
    #[error("{0} added to Cart")]
    CartItemCreated(&'a str),

    // checkout
    #[error("Checkout successful")]
    CheckoutSuccessful,
    #[error("Checkout Failed")]
    CheckoutFailed,
    #[error("Checkout empty")]
    CheckoutEmpty,

    // order
    #[error("Order not found: {0}")]
    OrderNotFound(&'a str),

    // product
    #[error("Product not found: {0}")]
    ProductNotFound(&'a str),

    // profile
    #[error("Profile has been updated")]
    ProfileUpdated,
    #[error("Password change success")]
    PasswordChangeSuccess,
    #[error("Invalid current password")]
    InvalidCurrentPassword
}

impl<'a> Into<String> for Messages<'a> {
    fn into(self) -> String {
        self.to_string()
    }
}
