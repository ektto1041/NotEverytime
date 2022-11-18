const express = require("express");
const rootRouter = express.Router();
const postJoin = require("../controllers/userController");

rootRouter.get("/", (req, res, next) => {
  res.send("rootRouter");
});

rootRouter.post("/join", postJoin);

module.exports = rootRouter;
