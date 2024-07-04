//user registration & log in
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const createLogger = require("../utils/logger");
const { generateToken } = require("../utils/jwt");
const logger = createLogger(__filename);

//registrater controller might be only used in development mode in CMS
const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    //data validation
    const existingUser = await UserModel.findOne({ username }).exec();
    if (existingUser) {
      res.formatResponse(`Username ${username} already exists`, 409); //conflicts
      return;
    }
    //HASH PW
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new UserModel({ username, password: hashedPassword });
    await user.save();
    res.formatResponse({ username: user.username }, 201);
    //email verification
    //twilio
    //or message queue -> aws sqs
  } catch (error) {
    logger.info(error.message);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username }).exec();
    //username verification
    if (!user) {
      res.formatResponse("Incorrect username and password", 401); //unauthorised
      return;
    }
    //PW verification
    if (!(await bcrypt.compare(password, user.password))) {
      res.formatResponse("Incorrect username and password", 401); //unauthorised
      return;
    }
    //Generate JWT
    const token = generateToken({ id: user.id, username: user.username });
    res.formatResponse({ username: user.username, token });
  } catch (error) {
    logger.info(error.message);
    next(error);
  }
};

module.exports = {
  register,
  login,
};
