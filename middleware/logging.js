const winston = require("winston");

module.exports = function() {
  const myconsole = new winston.transports.Console();
  winston.add(myconsole);
};
