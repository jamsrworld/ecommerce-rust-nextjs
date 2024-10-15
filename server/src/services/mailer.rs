use askama::Template;
use lettre::{
    transport::smtp::{
        authentication::Credentials,
        client::{Tls, TlsParameters},
    },
    Message, SmtpTransport, Transport,
};

use crate::error::HttpError;

// enum Encryption {
//     SSL,
//     TLS,
// }

struct MailConfig {
    username: String,
    password: String,
    host: String,
    port: u16,
}

pub struct Mailer<'a> {
    pub email: &'a str,
    pub body: &'a String,
    pub subject: &'a str,
}

impl<'a> Mailer<'a> {
    pub fn render_template<T: Template>(template: &T) -> Result<String, HttpError> {
        let body = template
            .render()
            .map_err(|e| HttpError::server_error(e.to_string()))?;
        Ok(body)
    }

    fn get_config(&self) -> MailConfig {
        let username = "demo@jamsrworld.com".to_string();
        let password = "jamsrworld_demo97@".to_owned();
        let host = "mail.jamsrworld.com".to_string();
        // let encryption = Encryption::TLS;
        // let port = match encryption {
        //     Encryption::SSL => 465,
        //     Encryption::TLS => 465,
        // };
        let port = 465;

        MailConfig {
            host,
            password,
            port,
            username,
        }
    }

    pub fn send(&self) -> Result<lettre::transport::smtp::response::Response, HttpError> {
        // let email = self.email;
        let email = "princeraj9137@gmail.com";
        let body = self.body.clone();
        let subject = self.subject;
        let MailConfig {
            host,
            password,
            port,
            username,
        } = self.get_config();

        let from = format!("Jamsrworld <{}>", username);

        let message = Message::builder()
            .from(from.parse().unwrap())
            .to(email.parse().unwrap())
            .subject(subject)
            .header(lettre::message::header::ContentType::TEXT_HTML)
            .body(body)
            .map_err(|e| HttpError::server_error(e.to_string()))?;

        let creds = Credentials::new(username, password);
        let tls_params = TlsParameters::builder(host.clone())
            .dangerous_accept_invalid_certs(true)
            .build()
            .map_err(|e| HttpError::server_error(e.to_string()))?;

        let mailer = SmtpTransport::relay(&host)
            .unwrap()
            .credentials(creds)
            .port(port)
            .tls(Tls::Wrapper(tls_params))
            .build();

        let sent = mailer
            .send(&message)
            .map_err(|e| HttpError::server_error(e.to_string()))?;

        Ok(sent)
    }
}
