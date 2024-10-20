use actix_web::HttpResponse;
use actix_web::Responder;
use actix_web::get;
use chrono::DateTime;
use chrono::Utc;
use serde::Serialize;
use sysinfo::System;
use utoipa::ToSchema;

#[derive(Debug, Serialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct SystemInfo {
    last_cron: DateTime<Utc>,
    last_success_cron: DateTime<Utc>,
    os_hostname: String,
    total_memory: u64,
    free_memory: u64,
    os_platform: String,
    os_version: String,
    up_time: u64,
    cpu_usage: f32,
}

/// Server Information
#[utoipa::path(
    tag = "Extra",
    context_path = "/extra",
    responses((status = 200, description = "server information", body = SystemInfo))
)]
#[get("/server-information")]
pub async fn server_information() -> impl Responder {
    let mut sys = System::new_all();
    sys.refresh_all();

    let cpu_usage = sys.global_cpu_usage().abs();
    let info = SystemInfo {
        last_cron: Utc::now(),
        last_success_cron: Utc::now(),
        os_hostname: System::host_name().unwrap_or_else(|| "Unknown".to_string()),
        total_memory: sys.total_memory(),
        free_memory: sys.free_memory(),
        os_platform: System::name().unwrap_or_else(|| "Unknown".to_string()),
        os_version: System::os_version().unwrap_or_else(|| "Unknown".to_string()),
        up_time: System::uptime(),
        cpu_usage,
    };

    HttpResponse::Ok().json(info)
}
