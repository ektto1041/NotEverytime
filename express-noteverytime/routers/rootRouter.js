const express = require("express");
const rootRouter = express.Router();

rootRouter.get("/", (req, res, next) => {
  res.send("rootRouter");
});

module.exports = rootRouter;
