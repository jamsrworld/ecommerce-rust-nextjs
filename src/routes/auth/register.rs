use crate::{
    error::HttpError, extractors::validator::ValidatedJson, utils::password::hash_password,
    validator::auth::Register, AppState,
};
use actix_web::{post, web, HttpResponse};
use entity::sea_orm_active_enums::{UserRole, UserStatus};
use sea_orm::{ActiveModelTrait, ActiveValue::NotSet, Set};

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
) -> Result<HttpResponse, HttpError> {
    println!("login {:#?}", input);
    let db = &app_data.db;

    let Register {
        email,
        full_name,
        password,
        username,
        ..
    } = input.0;

    // hash password
    let hashed_password = hash_password(password)?;

    // create user
    let new_user = entity::user::ActiveModel {
        id: Set(cuid2::create_id()),
        email: Set(email),
        full_name: Set(full_name),
        username: Set(username),
        password: Set(Some(hashed_password)),
        status: Set(UserStatus::Active),
        role: Set(UserRole::User),
        created_at: NotSet,
        updated_at: NotSet,
    };
    let user = new_user.insert(db).await.map_err(|e| e.to_string())?;
    dbg!(&user);

    Ok(HttpResponse::Ok().json(user))
}
