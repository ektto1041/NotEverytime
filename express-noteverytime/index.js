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

const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
}
app.use(cors(corsOptions));

db.on("error", handleError);
db.once("open", handleOpen);

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

const rootRouter = require('./routers/rootRouter');
const lectureRouter = require('./routers/lectureRouter');
app.use('/', rootRouter);
app.use('/lecture', lectureRouter);

app.listen(4000, () => {
  console.log("Hello! Node.js!");
});
