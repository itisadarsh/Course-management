#[macro_use] extern crate rocket;

#[get("/getcourses")]

fn getcourses()->&'static str{
    "hello"
}

#[launch]
fn rocket()-> _ {
  rocket::build().configure(rocket::Config::figment().merge(("port", 9796)))
  .mount("/api",routes![getcourses])
}
