use std::env;

use actix_web::cookie::{ time::Duration, Cookie, SameSite };
use log::info;
use url::Url;

// pub fn create_cookie<'a>(name: impl Into<String>, value: impl Into<String>) -> Cookie<'a> {
pub fn create_cookie(name: impl Into<String>, value: impl Into<String>) -> Cookie<'static> {
    let name = name.into();
    let value = value.into();
    let api_url = env::var("API_SERVER_URL").unwrap_or("no".to_string());
    let parsed_url = Url::parse(&api_url);

    let domain = (
        match parsed_url {
            Ok(url) => url.host_str().map(|host| host.to_string()),
            Err(_) => None,
        }
    ).unwrap_or("".to_string());

    info!("saving cookie for {}, {}, {}", &name, &value, &domain);

    Cookie::build(name, value)
        .path("/")
        .http_only(true)
        .secure(true)
        .same_site(SameSite::None)
        .domain(domain)
        .max_age(Duration::new(60 * 60 * 24, 0))
        .finish()
}
