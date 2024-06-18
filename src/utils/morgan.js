const morgan = require("morgan");
const config = require("../config");
const createLogger = require("./logger");
const logger = createLogger();

module.exports = morgan(config.NODE_ENV === "dev" ? "tiny" : "combined", {
  stream: logger.stream,
});
