const express = require("express");
const lectureRouter = express.Router();
const { getBoard } = require("../controllers/lectureController");

lectureRouter.get("/", (req, res, next) => {
  res.send("lectureRouter");
});

lectureRouter.get("/:lectureId/view", getBoard);

module.exports = lectureRouter;
