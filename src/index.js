const config = require("./config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("./utils/morgan");
const rateLimit = require("./utils/rateLimit");
const createLogger = require("./utils/logger");
const logger = createLogger(__filename);
const formatResponse = require("./middleware/formatResponse.middleware");
const unknownErrorMiddleware = require("./middleware/error/unknownError.middleware");
const v1Router = require("./routes");

const app = express();
app.use(helmet());
app.use(rateLimit); //bettter to put it up front like this
app.use(cors());
app.use(express.json());
app.use(morgan);
app.use(formatResponse);

app.use("/v1", v1Router);

app.use(unknownErrorMiddleware);

app.listen(config.PORT, () => {
  logger.info(`Server listening on port ${config.PORT}`);
});
