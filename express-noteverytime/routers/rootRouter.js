const express = require("express");
const rootRouter = express.Router();
const { postJoin, getLogin, postLogin, getLogout, getProfile, getMypage, editMypage, editMypageProfile, getAuthLecture, postAuthLecture } = require("../controllers/userController");
const { postEmail, confirmEmail, sendResultMessage } = require("../controllers/emailController");
const { isSessionMiddleware, profileUpload } = require("../middleware");

rootRouter.post("/join", postJoin, postEmail);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/authenticate/email", confirmEmail, sendResultMessage);

rootRouter.get("/", (req, res) => {
  res.send("rootRouter");
});

rootRouter.use(isSessionMiddleware);
rootRouter.get("/logout", isSessionMiddleware, getLogout);
rootRouter.get("/profile", getProfile);
rootRouter.get("/mypage" ,getMypage);
rootRouter.post("/mypage/profile/edit", profileUpload.single('profileImage'), editMypageProfile);
rootRouter.post("/mypage/edit", editMypage);
rootRouter.get("/authenticate/lecture", getAuthLecture);
rootRouter.post("/authenticate/lecture", postAuthLecture);

module.exports = rootRouter;
