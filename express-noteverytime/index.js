const express = require("express");
const app = express();
const db = require('./db');
require('dotenv').config();

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
