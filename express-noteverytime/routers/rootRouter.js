const express = require("express");
const rootRouter = express.Router();
const { postJoin, getLogin, postLogin } = require("../controllers/userController");

rootRouter.get("/", (req, res, next) => {
  res.send("rootRouter");
});

rootRouter.post("/join", postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);

module.exports = rootRouter;
