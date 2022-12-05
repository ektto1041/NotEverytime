const express = require("express");
const rootRouter = express.Router();
const { postJoin, getLogin, postLogin, getLogout, getMypage, editMypage, editMypageProfile, getUserLecture } = require("../controllers/userController");
const { isSessionMiddleware, profileUpload } = require("../middleware");

rootRouter.get("/", isSessionMiddleware, getUserLecture);

rootRouter.post("/join", postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/logout", isSessionMiddleware, getLogout);
rootRouter.get("/mypage" ,getMypage);
rootRouter.post("/mypage/profile/edit", profileUpload.single('profileImage'), editMypageProfile);
rootRouter.post("/mypage/edit", editMypage);

module.exports = rootRouter;
