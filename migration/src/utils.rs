use sea_orm_migration::{prelude::*, schema::*};

const CUID2_LENGTH: u32 = 24;

pub fn pg_primary_id<T: IntoIden>(col: T) -> ColumnDef {
    string_len(col, CUID2_LENGTH)
        .primary_key()
        .not_null()
        .to_owned()
}

pub fn pg_id<T: IntoIden>(col: T) -> ColumnDef {
    string_len(col, CUID2_LENGTH).not_null().to_owned()
}
