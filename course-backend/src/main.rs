#[macro_use] extern crate rocket;

use diesel::prelude::*;
use rocket::serde::json::Json;

// use serde::Deserialize;

mod database;
mod models;
mod schema;

use self::models::*;
use self::schema::courses::dsl::courses;
use rocket_cors::{CorsOptions, AllowedOrigins};


// #[derive(Debug, Deserialize, Insertable)]
// // #[table_name = "courses"] // Specify the table name here
 struct CoursesD {
     crscode: String,
     crsname: String,
     lechrs: String,
     tuthrs: String,
     prachrs: String,
     credits: i32,
}


#[get("/list")]
fn index() -> Json<Vec<Courses>> {
    let connection: &mut PgConnection = &mut database::establish_connection();
    courses.load::<Courses>(connection).map(Json).expect("Error loading Course")
}

#[post("/postcourses", data = "<course_data>")]
fn postcourses(course_data:Json<String>) -> &'static str {
//     let new_course = course_data.into_inner();
//     let connection = &mut database::establish_connection();

//     // diesel::insert_into(courses)
//     //      .values(&new_course)
//     //     .execute(connection)
//     //     .expect("Error inserting course into database");

    "Course created successfully"
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
