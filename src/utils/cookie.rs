use actix_web::cookie::{time::Duration, Cookie, SameSite};

pub fn create_cookie(name: impl Into<String>, value: impl Into<String>) -> Cookie<'static> {
    Cookie::build(name.into(), value.into())
        .path("/")
        .http_only(true)
        .secure(true)
        .same_site(SameSite::Lax)
        .max_age(Duration::new(60 * 60 * 24, 0))
        .finish()
}