const express = require("express");
const session = require('express-session');
const passport = require('./passportConfig'); // Adjust the path to your passportConfig file
require('dotenv').config();
const authRouter = require('./controller/auth');
const todoRouter = require('./controller/todo');
const pgSession = require('connect-pg-simple')(session); // Import the PostgreSQL session store
const pool = require('./model/database'); // Import the database connection

const port = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    store: new pgSession({
      pool: pool, // Use the existing PostgreSQL pool
      tableName: 'session' // Use a custom table name or the default 'session'
    }),
    secret: 'cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false , // Set to true if using HTTPS
    httpOnly: true, // Prevent client-side JavaScript access
    maxAge: 1000 * 60 * 60 }//  Session expiry (1 hour)
  }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/todo', todoRouter);

  
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
