#[derive(Debug, thiserror::Error)]
pub enum OrderMessage<'a> {
    #[error("Order not found: {0}")] OrderNotFound(&'a str),
}

impl<'a> Into<String> for OrderMessage<'a> {
    fn into(self) -> String {
        self.to_string()
    }
}
