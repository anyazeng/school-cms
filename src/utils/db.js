const mongoose = require("mongoose");
const config = require("../config");
const createLogger = require("./logger");
const logger = createLogger(__filename);

const connectToDB = async () => {
  //listen to DB events, to make sure when DB can be running normally when the server is running
  const db = mongoose.connection;

  db.on("error", (error) => {
    logger.error(error);
    process.exit(1);
    // 0 executed sucessfully and exit
    // 1 error and exit
  });

  db.on("connected", () => {
    logger.info("DB connected");
  });

  db.on("disconnected", () => {
    logger.warn("DB disconnected");
  });

  return mongoose.connect(config.DB_CONNECTION_STRING);
};

module.exports = connectToDB;

// The easiest way to connect MongoDB:
// mongoose.connect('connection string....')
