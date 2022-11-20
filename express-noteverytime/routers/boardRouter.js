const express = require("express");
const boardRouter = express.Router();
const { getBoard } = require("../controllers/boardController");

boardRouter.get("/", (req, res, next) => {
  res.send("boardRouter");
});

boardRouter.get("/:board_id/view", getBoard);

module.exports = boardRouter;
