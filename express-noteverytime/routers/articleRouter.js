const express = require("express");
const articleRouter = express.Router();
const { getArticle, editArticle, deleteArticle, getComment, editComment, deleteComment } = require("../controllers/articleController");
const { isSessionMiddleware, articleUpload } = require("../middleware");

articleRouter.get("/", (req, res, next) => {
  res.send("articleRouter");
});

articleRouter.use(isSessionMiddleware);
articleRouter.get("/:articleId", getArticle);
articleRouter.post("/edit", articleUpload.array('articleImage', 10), editArticle);
articleRouter.delete("/:articleId", deleteArticle);

articleRouter.get("/:articleId/comments", getComment);
articleRouter.post("/comments/edit", editComment);
articleRouter.delete("/:articleId/comments/:commentId", deleteComment);

module.exports = articleRouter;
