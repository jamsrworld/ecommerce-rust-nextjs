use deunicode::deunicode_char;

pub fn slugify(value: &str) -> String {
    slugify_with_replacement(value, '-')
}

/// Converts value to URL friendly slug
pub fn slugify_with_replacement(value: &str, replacement: char) -> String {
    trim_trailing_space(sanitize(value, replacement).to_lowercase().as_str(), replacement)
}

/// Removes all non alphanumeric, substitutes to replacement character, without trailing replacement
fn sanitize(value: &str, replacement: char) -> String {
    let mut out = String::new();
    for elem in value.chars() {
        if is_contained_in_limited_set(elem) {
            out.push(elem);
        } else if elem.is_alphabetic() {
            // characters that need to be decoded should already be in the alphabetic range, everything else is for replacement
            let decoded_elem = deunicode_char(elem).map(|d| sanitize(d, replacement));
            if let Some(decoded) = decoded_elem {
                out.push_str(&decoded);
            }
        } else if !out.ends_with(replacement) {
            out.push(replacement);
        }
    }

    out.to_string()
}

fn is_contained_in_limited_set(value: char) -> bool {
    matches!(value, '0'..='9' | 'a'..='z' | 'A'..='Z')
}

fn trim_trailing_space(value: &str, replacement: char) -> String {
    let mut check_value = value.to_string();
    if check_value.starts_with(replacement) {
        check_value.remove(0);
    }
    if check_value.ends_with(replacement) {
        check_value.pop();
    }
    check_value.to_string()
}
