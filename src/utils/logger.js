const winston = require("winston");
const path = require("path");

const createLogger = (filename) => {
  const logger = winston.createLogger({
    level: "info",
    defaultMeta: {
      file: filename ? path.basename(filename) : undefined,
    },
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, file, level, message }) => {
        return `[${timestamp}] [${level}] ${
          file ? `[${file}]` : ""
        }: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      //   new winston.transports.File({
      //       filename: "logs/infor.log",
      //       level:'info'
      //   }),
    ],
  });
  logger.stream = {
    write: (message) => {
      logger.info(message);
    },
  };
  return logger;
};

module.exports = createLogger;
