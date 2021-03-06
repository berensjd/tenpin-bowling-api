const winston = require("winston");
const express = require("express");
const config = require("config");

require("./middleware/logging")();

const app = express();
require("./startup/cors")(app);
require("./startup/routing")(app);
require("./startup/db")();
require("./startup/validation")();
require("./startup/production")(app);
const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);
module.exports = server;
