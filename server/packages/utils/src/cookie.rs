use actix_web::cookie::{ time::Duration, Cookie, SameSite };

// pub fn create_cookie<'a>(name: impl Into<String>, value: impl Into<String>) -> Cookie<'a> {
pub fn create_cookie(name: impl Into<String>, value: impl Into<String>) -> Cookie<'static> {
    let domain = ".jamsrworld.com";
    Cookie::build(name.into(), value.into())
        .path("/")
        .http_only(true)
        .secure(true)
        .same_site(SameSite::None)
        .domain(domain)
        .max_age(Duration::new(60 * 60 * 24, 0))
        .finish()
}
