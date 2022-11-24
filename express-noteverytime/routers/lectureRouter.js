const express = require("express");
const lectureRouter = express.Router();
const { getBoard, getArticle } = require("../controllers/lectureController");

lectureRouter.get("/", (req, res, next) => {
  res.send("lectureRouter");
});

lectureRouter.get("/:lectureId/view", getBoard);
lectureRouter.get("/:lectureId/view/:articleId", getArticle);

module.exports = lectureRouter;
