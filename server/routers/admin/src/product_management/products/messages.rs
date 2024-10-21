#[derive(Debug, thiserror::Error)]
pub enum ProductMessage<'a> {
    #[error("Product not found: {0}")]
    ProductNotFound(&'a str),
    #[error("Product already exists: {0}")]
    ProductAlreadyExists(&'a str),
    #[error("Product: {0} has been deleted")]
    ProductDeleted(&'a str),
    #[error("Product: {0} has been updated")]
    ProductUpdated(&'a str),
    #[error("Product: {0} has been created")]
    ProductCreated(&'a str),
}

impl<'a> Into<String> for ProductMessage<'a> {
    fn into(self) -> String {
        self.to_string()
    }
}
