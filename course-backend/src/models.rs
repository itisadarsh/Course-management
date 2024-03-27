use diesel::prelude::*;
use rocket::serde::{Serialize, Deserialize}; 
// use crate::schema::bird;
// use crate::schema::courses;
#[derive(Queryable, Serialize, Deserialize)]
#[diesel(table_name = crate::schema::courses)]
#[diesel(check_for_backend(diesel::pg::Pg))]
#[serde(crate = "rocket::serde")]

pub struct Courses {
    pub crscode:String,
    pub crsname:String,
    pub lechrs:String,
    pub tuthrs:String,
    pub prachrs:String,
    pub credits:i32,
}
