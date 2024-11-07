#[derive(Debug, thiserror::Error)]
pub enum ProductMessages<'a> {
    #[error("Product not found: {0}")] 
    ProductNotFound(&'a str),
}

impl<'a> Into<String> for ProductMessages<'a> {
    fn into(self) -> String {
        self.to_string()
    }
}
