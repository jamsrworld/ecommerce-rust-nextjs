#[derive(Debug, thiserror::Error)]
pub enum CheckoutMessage {
    #[error("Checkout successful")]
    CheckoutSuccessful,
    #[error("Checkout Failed")]
    CheckoutFailed,
}
