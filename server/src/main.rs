use actix_cors::Cors;
use actix_web::{ http, App, HttpServer };
use admin::AdminApiDoc;
use dotenvy::dotenv;
use sea_orm::{ ConnectOptions, Database };
use utils::AppState;
use utoipa::OpenApi;
use utoipa_scalar::{ Scalar, Servable };
use utoipa_swagger_ui::{ SwaggerUi, Url };
use www::{ www_routes, WwwApiDoc };
use admin::admin_routes;

#[actix_web::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // init dotenv
    dotenv().ok();

    // add tracing
    tracing_subscriber::fmt().with_max_level(tracing::Level::DEBUG).with_test_writer().init();

    let config = config::Config::new();
    let host = "0.0.0.0".to_string();
    let port = config.port;
    let database_url = config.database_url;

    // setup connection
    let mut opt = ConnectOptions::new(database_url);
    opt.sqlx_logging(false).sqlx_logging_level(log::LevelFilter::Debug);
    let db = Database::connect(opt).await.map_err(|e| e.to_string())?;
    // database_url

    println!("Starting server at http://localhost:{}", port);
    println!("Hello, world!");

    let app_data = actix_web::web::Data::new(AppState { db });
    let domain = "https://mcart-rust-nextjs.vercel.app";

    HttpServer::new(move || {
        let cors = Cors::default()
            // .allowed_origin("https://mcart.dev")
            .allowed_origin(domain)
            // .allowed_origin("http://localhost:5000")
            // .allow_any_origin()
            .supports_credentials()
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE", "OPTION", "PATCH"])
            .allowed_headers(
                vec![http::header::CONTENT_TYPE, http::header::ACCEPT, http::header::AUTHORIZATION]
            )
            .max_age(3600);

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
            .configure(www_routes)
    })
        .bind((host, port))?
        .run().await?;

    Ok(())
}
