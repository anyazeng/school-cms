module.exports = (error, req, res, next) => {
  //handle third party Joi error
  if (error.name === "ValidationError") {
    res.formatResponse(error.message, 400);
    return;
  }
  next(error);
};
