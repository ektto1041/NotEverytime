const express = require("express");
const articleRouter = express.Router();
const { getArticle, editArticle } = require("../controllers/articleController");
const { isSessionMiddleware, articleUpload } = require("../middleware");

articleRouter.get("/", (req, res, next) => {
  res.send("articleRouter");
});

articleRouter.get("/:articleId", getArticle);
articleRouter.post("/edit", articleUpload.array('articleImage', 10), editArticle);

module.exports = articleRouter;
