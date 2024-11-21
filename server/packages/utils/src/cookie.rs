use actix_web::cookie::{ time::Duration, Cookie, SameSite };
use log::info;
use url::Url;

// pub fn create_cookie<'a>(name: impl Into<String>, value: impl Into<String>) -> Cookie<'a> {
pub fn create_cookie(
    name: impl Into<String>,
    value: impl Into<String>,
    app_server_url: String
) -> Cookie<'static> {
    let name = name.into();
    let value = value.into();
    let parsed_url = Url::parse(&app_server_url);

    // extra domain to save cookie
    // jamsrworld.com -> .jamsrworld.com
    // mcart.jamsrworld.com -> .jamsrworld.com
    let domain = (
        match parsed_url {
            Ok(url) => {
                url.host_str().and_then(|host| {
                    let parts: Vec<&str> = host.split(".").collect();
                    if parts.len() > 1 {
                        Some(format!(".{}.{}", parts[parts.len() - 2], parts[parts.len() - 1]))
                    } else {
                        None
                    }
                })
            }
            Err(_) => None,
        }
    ).unwrap_or("".to_string());
    info!("saving cookie for {}, {}, {}", &name, &domain, &value);

    Cookie::build(name, value)
        .path("/")
        .http_only(true)
        .secure(true)
        .same_site(SameSite::None)
        .domain(domain)
        .max_age(Duration::new(60 * 60 * 24, 0))
        .finish()
}
