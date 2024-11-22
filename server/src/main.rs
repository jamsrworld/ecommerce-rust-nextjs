use actix_cors::Cors;
use actix_web::{ http, App, HttpServer };
use admin::AdminApiDoc;
use dotenvy::dotenv;
use log::info;
use redis::aio::ConnectionManager;
use sea_orm::{ ConnectOptions, Database };
use utils::AppState;
use utoipa::OpenApi;
use utoipa_scalar::{ Scalar, Servable };
use utoipa_swagger_ui::{ SwaggerUi, Url };
use www::{ www_routes, WwwApiDoc };
use admin::admin_routes;
use actix_extensible_rate_limit::backend::redis::RedisBackend;

#[actix_web::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // init dotenv
    dotenv().ok();

    // add tracing
    tracing_subscriber::fmt().with_max_level(tracing::Level::DEBUG).with_test_writer().init();

    let config = config::Config::new();
    let host = "0.0.0.0".to_string();
    let port = config.port;
    let database_url = &config.database_url;

    // setup connection
    let mut opt = ConnectOptions::new(database_url);
    opt.sqlx_logging(false).sqlx_logging_level(log::LevelFilter::Debug);
    let db = Database::connect(opt).await.map_err(|e| e.to_string())?;

    // connect redis
    let redis_url = config.redis_url.to_owned();
    let client = redis::Client::open(redis_url).expect("Invalid connection URL");
    let connection = ConnectionManager::new(client).await.map_err(
        |_| "Failed to connect to Redis"
    )?;
    let redis_backend = RedisBackend::builder(connection).build();

    let app_data = actix_web::web::Data::new(AppState {
        db,
        env: config,
        redis_backend,
    });
    info!("Starting server at http://localhost:{}", port);
    info!("Hello, world!");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .supports_credentials()
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE", "OPTION", "PATCH"])
            .allowed_headers(
                vec![http::header::CONTENT_TYPE, http::header::ACCEPT, http::header::AUTHORIZATION]
            )
            .max_age(None);

        App::new()
            .wrap(cors)
            .app_data(app_data.clone())
            .configure(admin_routes)
            .service(
                SwaggerUi::new("/swagger-ui/{_:.*}").urls(
                    vec![
                        (Url::new("api", "/api-docs/openapi.json"), WwwApiDoc::openapi()),
                        (
                            Url::with_primary("api2", "/api-docs/openapi-admin.json", true),
                            AdminApiDoc::openapi(),
                        )
                    ]
                )
            )
            .service(Scalar::with_url("/scalar", WwwApiDoc::openapi()))
            .service(Scalar::with_url("/scalar-admin", AdminApiDoc::openapi()))
            .configure(|cfg| www_routes(cfg, app_data.clone()))
    })
        .bind((host, port))?
        .run().await?;

    Ok(())
}
