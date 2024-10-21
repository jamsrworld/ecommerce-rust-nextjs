#[derive(Debug, thiserror::Error)]
pub enum AttributeMessage<'a> {
    #[error("Attribute not found: {0}")]
    AttributeNotFound(&'a str),
    #[error("Attribute already exists: {0}")]
    AttributeAlreadyExists(&'a str),
    #[error("Attribute: {0} has been deleted")]
    AttributeDeleted(&'a str),
    #[error("Attribute: {0} has been updated")]
    AttributeUpdated(&'a str),
    #[error("Attribute: {0} has been created")]
    AttributeCreated(&'a str),
}

impl<'a> Into<String> for AttributeMessage<'a> {
    fn into(self) -> String {
        self.to_string()
    }
}
