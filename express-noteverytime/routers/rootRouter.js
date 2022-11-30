const express = require("express");
const rootRouter = express.Router();
const { postJoin, getLogin, postLogin, getLogout, getMypage, editMypage } = require("../controllers/userController");
const { isSessionMiddleware } = require("../middleware");

rootRouter.get("/", (req, res, next) => {
  res.send(req.session);
});

rootRouter.post("/join", postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/logout", isSessionMiddleware, getLogout);
rootRouter.get("/mypage" ,getMypage);
rootRouter.post("/mypage/edit", editMypage);

module.exports = rootRouter;