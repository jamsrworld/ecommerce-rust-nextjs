pub enum SessionKey {
    Authorization,
    AdminAuthorization,
}

impl Into<&'static str> for SessionKey {
    fn into(self) -> &'static str {
        match self {
            SessionKey::Authorization => "x-mcart-session",
            SessionKey::AdminAuthorization => "x-mcart-admin-session",
        }
    }
}

impl Into<String> for SessionKey {
    fn into(self) -> String {
        let s: &'static str = self.into();
        s.to_owned() // Convert &str to String
    }
}
