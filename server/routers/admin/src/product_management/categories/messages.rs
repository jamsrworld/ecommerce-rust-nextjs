#[derive(Debug, thiserror::Error)]
pub enum CategoryMessage<'a> {
    #[error("Category not found: {0}")]
    CategoryNotFound(&'a str),
    #[error("Category already exists: {0}")]
    CategoryAlreadyExists(&'a str),
    #[error("Category: {0} has been deleted")]
    CategoryDeleted(&'a str),
    #[error("Category: {0} has been updated")]
    CategoryUpdated(&'a str),
    #[error("Category: {0} has been created")]
    CategoryCreated(&'a str),
}

impl<'a> Into<String> for CategoryMessage<'a> {
    fn into(self) -> String {
        self.to_string()
    }
}
