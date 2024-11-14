#[derive(Debug, thiserror::Error)]
pub enum CartMessages<'a> {
    #[error("Cart Item not found: {0}")] CartItemNotFound(&'a str),
    #[error("Cart Item removed: {0}")] CartItemRemoved(&'a str),
    #[error("Cart Item updated: {0}")] CartItemUpdated(&'a str),
    #[error("{0} added to Cart")] CartItemCreated(&'a str),
}

impl<'a> Into<String> for CartMessages<'a> {
    fn into(self) -> String {
        self.to_string()
    }
}
