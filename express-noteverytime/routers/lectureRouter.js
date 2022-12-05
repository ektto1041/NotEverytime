const express = require("express");
const lectureRouter = express.Router();
const { getLecture, getArticles, getArticle, postEdit } = require("../controllers/lectureController");
const { isSessionMiddleware, articleUpload } = require("../middleware");

lectureRouter.get("/", (req, res, next) => {
  res.send("lectureRouter");
});

lectureRouter.get("/:lectureId", getLecture);
// lectureRouter.get("/:lectureId/view", getBoard);
lectureRouter.get("/:lectureId/articles", getArticles);
// lectureRouter.get("/:lectureId/articles/:articleId", getArticle);
lectureRouter.post("/:lectureId/articles/edit", articleUpload.single('articleImage'), postEdit);

module.exports = lectureRouter;
