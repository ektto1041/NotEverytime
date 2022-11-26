const express = require("express");
const app = express();
const db = require('./db');
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config();

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: process.env.DB_URL}),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    }
  })
)

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

const cors = require('cors');
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true
}
app.use(cors(corsOptions));

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

const rootRouter = require('./routers/rootRouter');
const lectureRouter = require('./routers/lectureRouter');

app.use('/', rootRouter);
app.use('/lecture', lectureRouter);

app.listen(4000, () => {
  console.log("Hello! Node.js!");
});
