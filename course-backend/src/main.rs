#[macro_use] extern crate rocket;

use diesel::{prelude::*, sql_types::Text};
use rocket::serde::json::Json;



mod database;
mod models;
mod schema;

use models::*; 
use schema::courses::dsl::courses;
use rocket_cors::{CorsOptions, AllowedOrigins};
use diesel::sql_types::Integer;


#[get("/list")]
fn index() -> Json<Vec<Courses>> {
    let connection: &mut PgConnection = &mut database::establish_connection();
    courses.load::<Courses>(connection).map(Json).expect("Error loading Course")
}



#[post("/postcourses", data = "<course_data>")]
fn postcourses(course_data: Json<Courses>) -> &'static str {
    let new_course = course_data.into_inner();
    let connection: &mut PgConnection = &mut database::establish_connection();

    let sql: &str = "INSERT INTO courses (crscode, crsname, lechrs, tuthrs, prachrs, credits) VALUES ($1, $2, $3, $4, $5, $6)";
    
    match diesel::sql_query(sql)
        .bind::<Text, _>(&new_course.crscode)
        .bind::<Text, _>(&new_course.crsname)
        .bind::<Text, _>(&new_course.lechrs)
        .bind::<Text, _>(&new_course.tuthrs)
        .bind::<Text, _>(&new_course.prachrs)
        .bind::<Integer, _>(&new_course.credits)
        .execute(connection)
    {
        Ok(rows_affected) => {
            println!("{} row(s) inserted", rows_affected);
            "Course created successfully"
        },
        Err(e) => {
            eprintln!("Error inserting course into database: {:?}", e);
            "Error creating course"
        }
    }
}

#[launch]
fn rocket() -> _ {
    let cors: rocket_cors::Cors = CorsOptions {
        allowed_origins: AllowedOrigins::all(),
        allowed_methods: vec![rocket::http::Method::Get, rocket::http::Method::Post]
            .into_iter()
            .map(From::from)
            .collect(),
        ..Default::default()
    }
    .to_cors()
    .expect("Error creating CORS options");

    rocket::build()
        .configure(rocket::Config::figment().merge(("port", 9796)))
        .attach(cors)
        .mount("/api", routes![postcourses, index])
}
