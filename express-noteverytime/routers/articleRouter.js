const express = require("express");
const articleRouter = express.Router();
const { getLecture, getArticles, getArticle, postEdit, getUserLecture } = require("../controllers/articleController");
const { isSessionMiddleware, articleUpload } = require("../middleware");

articleRouter.get("/", (req, res, next) => {
  res.send("lectureRouter");
});

articleRouter.get("/:articleId", getArticle);
// articleRouter.get("/semesters/:semester", getUserLecture);
// articleRouter.post("/:lectureId/articles/edit", articleUpload.single('articleImage'), postEdit);

module.exports = articleRouter;
