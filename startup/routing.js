const express = require("express");
const newgame = require("../routing/newgame");
const result = require("../routing/result");
const score = require("../routing/score");
const history = require("../routing/history");
const error = require("../middleware/error");
module.exports = function(app) {
  app.use(express.json());

  app.use("/api/new", newgame);
  app.use("/api/result", result);
  app.use("/api/score", score);
  app.use("/api/history", history);
  app.use(error);
};
