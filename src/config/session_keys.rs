pub enum SessionKey {
    Authorization,
    AdminAuthorization,
}

impl Into<String> for SessionKey {
    fn into(self) -> String {
        match self {
            SessionKey::Authorization => "x-session",
            SessionKey::AdminAuthorization => "x-admin-session",
        }
        .to_owned()
    }
}
