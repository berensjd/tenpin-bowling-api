const express = require("express");
const newgame = require("../routing/newgame");
const result = require("../routing/result");
const error = require("../middleware/error");
module.exports = function(app) {
  app.use(express.json());

  app.use("/api/new", newgame);
  app.use("/api/result", result);
  app.use(error);
};
