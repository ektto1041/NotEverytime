const express = require("express");
const articleRouter = express.Router();
const { getArticle, editArticle, editComment, getComment } = require("../controllers/articleController");
const { isSessionMiddleware, articleUpload } = require("../middleware");

articleRouter.get("/", (req, res, next) => {
  res.send("articleRouter");
});

articleRouter.get("/:articleId", getArticle);
articleRouter.post("/edit", articleUpload.array('articleImage', 10), editArticle);
articleRouter.post("/comments/edit", editComment);
// articleRouter.get("/:article_id/comments", getComment);

module.exports = articleRouter;
