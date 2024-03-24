#[macro_use] extern crate rocket;

use diesel::prelude::*;
// use diesel::pg::PgConnection;
// use rocket::{Build, Rocket};

use self::models::*;
use self::schema::courses::dsl::*;


use rocket::serde::json::Json;


mod database;
mod models;
mod schema;

#[get("/list")]
fn index() -> Json<Vec<Courses>> {
    let connection: &mut PgConnection = &mut database::establish_connection();

    courses.load::<Courses>(connection).map(Json).expect("Error loading Course")
}


#[get("/getcourses")]
fn getcourses()->&'static str{
    "hello"
}

// #[derive(Debug,Clone,FromForm,Serialize,Deserialize)]
// #[serde(crate="rocket::serde")]


// #[post("/courses",data="<form>")]
// fn post(form:Form<Course>,msg:&State<Sender<Course>>){

//         let _res=queue.send();
// }

#[launch]
fn rocket()-> _ {
  rocket::build().configure(rocket::Config::figment().merge(("port", 9796)))
  .mount("/api",routes![getcourses,index])
}





