use chrono::{ Duration, Utc };
use jsonwebtoken::{ decode, encode, DecodingKey, EncodingKey, Header, Validation };
use serde::{ Deserialize, Serialize };

#[derive(Debug, Serialize, Deserialize)]
pub struct TokenClaims {
    pub sub: String,
    pub iat: usize,
    pub exp: usize,
}

pub fn create_token(
    user_id: String,
    secret_key: String
) -> Result<String, jsonwebtoken::errors::Error> {
    let now = Utc::now();
    let iat = now.timestamp() as usize;
    let exp = (now + Duration::hours(24)).timestamp() as usize;
    let claims = TokenClaims {
        sub: user_id,
        exp,
        iat,
    };
    encode(&Header::default(), &claims, &EncodingKey::from_secret(secret_key.as_bytes()))
}

pub fn decode_token(
    token: &str,
    secret_key: String
) -> Result<String, jsonwebtoken::errors::Error> {
    let token_data = decode::<TokenClaims>(
        token,
        &DecodingKey::from_secret(secret_key.as_bytes()),
        &Validation::default()
    )?;
    Ok(token_data.claims.sub)
}
