const express = require("express");
const lectureRouter = express.Router();
const { getBoard, getArticle } = require("../controllers/lectureController");
const { isSessionMiddleware } = require("../middleware");

lectureRouter.get("/", (req, res, next) => {
  res.send("lectureRouter");
});

lectureRouter.get("/:lectureId/view", isSessionMiddleware, getBoard);
lectureRouter.get("/:lectureId/view/:articleId", isSessionMiddleware, getArticle);

module.exports = lectureRouter;
