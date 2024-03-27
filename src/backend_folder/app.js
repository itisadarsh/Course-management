import dotenv from "dotenv";
dotenv.config();
import express from "express";
import ejs from "ejs";
import path from "path";
import pg from 'pg';
import bodyParser from "body-parser";
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';



const app = express();
const port = 6001;
app.set('view engine', 'ejs')

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    password: "9755686556Ap$",
    
  });
  db.connect().then(()=>{console.log("DB_connected")});

  app.use(
    session({
      secret: "Your_secret_key is my hands",
      resave: true,
      saveUninitialized: true,
    })
  );
  


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
//app.use('/css',express.static(__dirname+'public/css'));
const __dirname = path.resolve()
app.use(bodyParser.json());
app.use(cookieParser());

// Custom middleware to check user authentication
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get('/', (req,res) =>{
    //const imagePath = 'https://img.freepik.com/free-vector/lightened-luxury-sedan-car-darkness-with-headlamps-rear-lights-lit-realistic-image-reflection_1284-28803.jpg?w=996&t=st=1701346107~exp=1701346707~hmac=af8053a5f420e9a27c88f37d3c45b7f585401ff64d3381ee6403d883846cec81';
    //res.render('yourFile', { imagePath });
    let errorMessage = null; 
    res.render("main", { errorMessage: errorMessage });
});



app.get('/signup',(req,res)=>{
   
  res.render("signup.ejs",{ errorMessage: null });
});



app.get('/login', async(req,res) =>{
  res.render("login.ejs",{ errorMessage: null });
});

app.post('/signup', async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Check if the email already exists
    const emailExists = await db.query('SELECT * FROM users WHERE username = $1', [username]);

    if (emailExists.rows.length > 0) {
      // Email already exists, send a message to the user
      res.render('signup', { errorMessage: 'Email already exists. Please use a different email.' });
    } else if (password.length < 8) {
      // Password is less than 8 characters, render an error message
      res.render('signup', { errorMessage: 'Password must be at least 8 characters long.' });
    } else {
      // Email does not exist, proceed with signup
      const result = await db.query('INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING *', [
        name,
        username,
        hashedPassword, // Store the hashed password
      ]);

      req.session.user = result.rows[0];
      res.redirect('/');
    }
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Error during signup');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.render('login', { errorMessage: 'Invalid credentials. Please check your username and password.' });
      }
    } else {
      res.render('login', { errorMessage: 'Invalid credentials. Please check your username and password.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Error during login');
  }
});


// Logout route
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      res.status(500).send('Error during logout');
    } else {
      res.redirect('/');
    }
  });
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });