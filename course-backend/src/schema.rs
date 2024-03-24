// @generated automatically by Diesel CLI.

diesel::table! {
    course (crscode) {
        crscode -> Varchar,
        crsname -> Varchar,
        lechrs -> Varchar,
        tuthrs -> Varchar,
        prachrs -> Varchar,
        credits -> Int4,
    }
}

diesel::allow_tables_to_appear_in_same_query!(
    courses,
);
