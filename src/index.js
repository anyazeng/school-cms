const config = require("./config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("./utils/morgan");
const rateLimit = require("./utils/rateLimit");
const createLogger = require("./utils/logger");
const logger = createLogger(__filename);
const formatResponseMiddleware = require("./middleware/formatResponse.middleware");
const pathNotFoundMiddleware = require("./middleware/error/pathNotFound.middleware");
const unknownErrorMiddleware = require("./middleware/error/unknownError.middleware");
const v1Router = require("./routes");
const { connect } = require("./routes/student.router");
const connectToDB = require("./utils/db");
const validationErrorMiddleware = require("./middleware/error/validationError.middleware");

const app = express();
app.use(helmet());
app.use(rateLimit); //bettter to put it up front like this
app.use(cors());
app.use(express.json());
app.use(morgan);
app.use(formatResponseMiddleware);

app.use("/v1", v1Router);

app.use(pathNotFoundMiddleware);
app.use(validationErrorMiddleware);
app.use(unknownErrorMiddleware);

//to make sure when DB is connected before listening on port
connectToDB().then(() => {
  app.listen(config.PORT, () => {
    logger.info(`Server listening on port ${config.PORT}`);
  });
});
