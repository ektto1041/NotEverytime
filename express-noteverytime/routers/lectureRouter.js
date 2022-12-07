const express = require("express");
const lectureRouter = express.Router();
const { getLecture, getArticles, getUserLecture } = require("../controllers/lectureController");
const { isSessionMiddleware, articleUpload } = require("../middleware");

lectureRouter.get("/", (req, res, next) => {
  res.send("lectureRouter");
});

lectureRouter.get("/semesters/:semester?", getUserLecture);
lectureRouter.get("/:lectureId", getLecture);
lectureRouter.get("/:lectureId/articles", getArticles);

module.exports = lectureRouter;
