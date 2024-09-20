use argon2::{
    password_hash::{rand_core::OsRng, SaltString},
    Argon2, PasswordHash, PasswordHasher, PasswordVerifier,
};

use crate::error::ErrorMessage;

pub fn hash_password(password: impl Into<String>) -> Result<String, String> {
    let salt: SaltString = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let hashed_password = argon2
        .hash_password(&password.into().as_bytes(), &salt)
        .map_err(|_| ErrorMessage::HashingError.to_string())?
        .to_string();
    Ok(hashed_password)
}

pub fn verify_password(
    hash: impl Into<String>,
    compare_password: impl Into<String>,
) -> Result<bool, String> {
    let hash: String = hash.into();
    let compare_password: String = compare_password.into();

    let parsed_hash = PasswordHash::new(&hash).map_err(|e| e.to_string())?;
    match Argon2::default().verify_password(compare_password.as_bytes(), &parsed_hash) {
        Ok(_) => Ok(true),
        Err(_) => Ok(false),
    }
}