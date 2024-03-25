#[macro_use] extern crate rocket;

use diesel::prelude::*;
// use diesel::pg::PgConnection;
// use rocket::{Build, Rocket};

use self::models::*;
use self::schema::courses::dsl::*;
// use rocket_cors::CorsLayer;

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

// let cors = CorsOptions::default()
// .allow_credentials(true)
// .to_cors().expect("Error creating CORS options");

// use http::header::{CONTENT_TYPE};

// const CORS = CorsLayer::new()
//    .allow_methods([Method::GET, Method::POST])
//    .allow_origin(Any)
//    .allow_headers([CONTENT_TYPE]);


#[launch]
fn rocket()-> _ {
  rocket::build().configure(rocket::Config::figment().merge(("port", 9796)))
  .mount("/api",routes![getcourses,index])
}












// use std::error::Error;

// use rocket::http::Method;
// use rocket::{get, routes};
// use rocket_cors::{AllowedHeaders, AllowedOrigins};


// #[rocket::main]
// async fn main() -> Result<(), Box<dyn Error>> {
//     let allowed_origins = AllowedOrigins::some_exact(&["https://www.acme.com"]);

//     // You can also deserialize this
//     let cors = rocket_cors::CorsOptions {
//         allowed_origins,
//         allowed_methods: vec![Method::Get].into_iter().map(From::from).collect(),
//         allowed_headers: AllowedHeaders::some(&["Authorization", "Accept"]),
//         allow_credentials: true,
//         ..Default::default()
//     }
//     .to_cors()?;

//     rocket::build()
//         .mount("/", routes![index,getcourses])
//         .attach(cors)
//         .launch()
//         .await?;

//     Ok(())
// }




