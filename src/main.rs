use actix_web::{App, HttpServer};
use dotenvy::dotenv;
use routes::{auth::auth_routes, home::health_check, profile::profile_routes};
use sea_orm::{ConnectOptions, Database, DatabaseConnection};
use utoipa::OpenApi;
use utoipa_scalar::{Scalar, Servable};
use utoipa_swagger_ui::SwaggerUi;
use utoipauto::utoipauto;

mod config;
mod error;
mod extractors;
mod models;
mod routes;
mod utils;
mod validator;

#[utoipauto()]
#[derive(OpenApi)]
#[openapi(info(title = "Mcart api documentation"), paths())]
struct ApiDoc;

pub struct AppState {
    pub db: DatabaseConnection,
}

#[actix_web::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // init dotenv
    dotenv().ok();

    // add tracing
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::DEBUG)
        .with_test_writer()
        .init();

    let config = config::Config::new();
    let host = "0.0.0.0".to_string();
    let port = config.port;
    let database_url = config.database_url;

    // setup connection
    let mut opt = ConnectOptions::new(database_url);
    opt.sqlx_logging(false)
        .sqlx_logging_level(log::LevelFilter::Debug);
    let db = Database::connect(opt).await.map_err(|e| e.to_string())?;
    // database_url

    println!("Starting server at http://{}:{}", host, port);
    println!("Hello, world!");

    let app_data = actix_web::web::Data::new(AppState { db });
    let openapi = ApiDoc::openapi();

    HttpServer::new(move || {
        App::new()
            .app_data(app_data.clone())
            .service(health_check)
            .service(auth_routes())
            .service(profile_routes())
            .service(
                SwaggerUi::new("/swagger-ui/{_:.*}").url("/api-doc/openapi.json", openapi.clone()),
            )
            .service(Scalar::with_url("/scalar", openapi.clone()))
    })
    .bind((host, port))?
    .run()
    .await?;

    Ok(())
}
