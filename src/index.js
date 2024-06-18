const config = require("./config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("./utils/morgan");
const rateLimit = require("./utils/rateLimit");
const createLogger = require("./utils/logger");
const logger = createLogger(__filename);
const formatResponse = require("./middleware/formatResponse.middleware");

const app = express();
app.use(helmet());
app.use(rateLimit); //bettter to put it up front like this
app.use(cors());
app.use(express.json());
app.use(morgan);
app.use(formatResponse);

app.get("/", (req, res) => {
  res.formatResponse("Coding is so much fun!!");
});

app.listen(config.PORT, () => {
  logger.info(`Server listening on port ${config.PORT}`);
});
