// @generated automatically by Diesel CLI.

diesel::table! {
    courses (crscode) {
        crscode -> Varchar,
        crsname -> Varchar,
        lechrs -> Varchar,
        tuthrs -> Varchar,
        prachrs -> Varchar,
        credits -> Int4,
    }
}
