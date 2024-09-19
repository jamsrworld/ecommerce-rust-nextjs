use crate::{
    error::{HttpError, ResponseWithMessage},
    extractors::validator::ValidatedJson,
    utils::{cookie::create_cookie, jwt::create_token},
    validator::auth::{ForgotPassword, Login, Register, ResetPassword},
    AppState,
};
use actix_web::{delete, post, web, HttpResponse, Scope};

pub fn auth_routes() -> Scope {
    web::scope("/auth")
        .service(login)
        .service(register)
        .service(forgot_password)
        .service(reset_password)
        .service(logout)
}

/// Login
///
/// Api to login for user
#[utoipa::path(
    tag = "Auth",
    context_path = "/auth",
    request_body(content = Login),
    responses( (status=200, body = ResponseWithMessage, example = json!({"message":"Login Successful"})) )
)
]
#[post("/login")]
pub async fn login(input: ValidatedJson<Login>) -> Result<HttpResponse, HttpError> {
    let email = &input.email;
    // check if user exist

    // validate password

    // create login token
    let jwt = create_token(email.to_owned())?;

    // create session cookie
    let cookie = create_cookie("x-session", jwt);

    // send response with cookie
    let response = ResponseWithMessage {
        message: "Login Successful".to_string(),
    };
    Ok(HttpResponse::Ok().cookie(cookie).json(response))
}

/// Register
#[utoipa::path(
    tag = "Auth", 
    context_path = "/auth",
    request_body(content = Register),
    responses( (status=200, body = Response) )
)
]
#[post("/register")]
pub async fn register(
    app_data: web::Data<AppState>,
    input: ValidatedJson<Register>,
) -> Result<HttpResponse, actix_web::Error> {
    println!("login {:#?}", input);
    let database_url = &app_data.database_url;

    Ok(HttpResponse::Ok().body("register"))
}

/// Forgot Password
#[utoipa::path(
    tag = "Auth", 
    context_path = "/auth",
    request_body(content = ForgotPassword),
    responses( (status=200, body = Response) )
)
]
#[post("/forgot-password")]
pub async fn forgot_password(
    input: ValidatedJson<ForgotPassword>,
) -> Result<HttpResponse, actix_web::Error> {
    println!("login {:#?}", input);

    Ok(HttpResponse::Ok().body("forgot password"))
}

/// Reset Password
#[utoipa::path(
    tag = "Auth", 
    context_path = "/auth",
    request_body(content = ResetPassword),
    responses( (status=200, body = Response) )
)
]
#[post("/reset-password")]
pub async fn reset_password(
    input: ValidatedJson<ResetPassword>,
) -> Result<HttpResponse, actix_web::Error> {
    println!("login {:#?}", input);

    Ok(HttpResponse::Ok().body("reset password"))
}

/// Logout
#[utoipa::path(
    tag = "Auth", 
    context_path = "/auth",
    responses( (status=200, body = Response) )
)
]
#[delete("/logout")]
pub async fn logout() -> Result<HttpResponse, actix_web::Error> {
    Ok(HttpResponse::Ok().body("logout"))
}
