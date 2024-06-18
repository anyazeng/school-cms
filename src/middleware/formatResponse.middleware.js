module.exports = (req, res, next) => {
  res.formatResponse = (data, statusCode = 200, customObject = {}) => {
    const datakey = statusCode < 400 ? "data" : "error";
    const responseData = {
      status: statusCode,
      [datakey]: data,
      ...customObject,
    };
    res.status(statusCode).json(responseData);
  };
  next(); //NOTE:have to call next for all the middleware
};
