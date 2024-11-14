#[derive(Debug, thiserror::Error)]
pub enum CheckoutMessage {
    #[error("Checkout successful")]
    CheckoutSuccessful,
    #[error("Checkout Failed")]
    CheckoutFailed,
    #[error("Checkout empty")]
    CheckoutEmpty,
}

impl Into<String> for CheckoutMessage {
    fn into(self) -> String {
        self.to_string()
    }
}
