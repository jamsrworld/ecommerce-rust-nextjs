use crate::config::CUID2_LENGTH;
use sea_orm_migration::{prelude::*, schema::*};

pub fn pg_primary_id<T: IntoIden>(col: T) -> ColumnDef {
    string_len(col, CUID2_LENGTH)
        .primary_key()
        .not_null()
        .to_owned()
}

pub fn pg_id<T: IntoIden>(col: T) -> ColumnDef {
    string_len(col, CUID2_LENGTH).not_null().to_owned()
}

pub fn timestampz<T: IntoIden>(col: T) -> ColumnDef {
    timestamp_with_time_zone(col).to_owned()
}

pub fn timestampz_default<T: IntoIden>(col: T) -> ColumnDef {
    timestamp_with_time_zone(col)
        .default(SimpleExpr::Keyword(Keyword::CurrentTimestamp))
        .to_owned()
}
