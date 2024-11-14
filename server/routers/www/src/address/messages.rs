use serde::Serialize;

#[derive(Debug, thiserror::Error, Serialize)]
pub enum AddressMessage<'a> {
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
}

impl<'a> Into<String> for AddressMessage<'a> {
    fn into(self) -> String {
        self.to_string()
    }
}
