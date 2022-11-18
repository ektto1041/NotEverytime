const express = require("express");
const app = express();

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/noteverytime", { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const handleOpen = () => console.log("Connected to DB");
const handleError = (error) => console.log("DB Error", error);

db.on("error", handleError);
db.once("open", handleOpen);

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

const rootRouter = require('./routers/rootRouter');
app.use('/', rootRouter);

app.listen(4000, () => {
  console.log("Hello! Node.js!");
});