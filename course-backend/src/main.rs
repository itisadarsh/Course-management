use rocket::form::Form;
use serde::{Deserialize, Serialize};

#[macro_use] extern crate rocket;

#[get("/getcourses")]
fn getcourses()->&'static str{
    "hello"
}

#[derive(Debug,Clone,FromForm,Serialize,Deserialize)]
#[serde(crate="rocket::serde")]


struct Course{
    pub crscode:String,
    pub crsname:String,
    pub lechrs:String,
    pub tuthrs:String,
    pub prachrs:String,
    pub credits:String,
}

// #[post("/courses",data="<form>")]
// fn post(form:Form<Course>,msg:&State<Sender<Course>>){

//         let _res=queue.send();
// }

#[launch]
fn rocket()-> _ {
  rocket::build().configure(rocket::Config::figment().merge(("port", 9796)))
  .mount("/api",routes![getcourses])
}
