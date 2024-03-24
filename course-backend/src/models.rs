use diesel::prelude::*;
use rocket::serde::Serialize;
// use crate::schema::bird;
#[derive(Queryable, Serialize)]
#[diesel(table_name = crate::schema::course)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[serde(crate = "rocket::serde")]

pub struct Bird {
    pub crscode:String,
    pub crsname:String,
    pub lechrs:String,
    pub tuthrs:String,
    pub prachrs:String,
    pub credits:String,
}
