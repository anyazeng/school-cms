module.exports = (req, res, next) => {
  if (!req.user) {
    res.formatResponse("Invalid token", 401);
    return;
  }
  if (req.user.role !== "admin") {
    res.formatResponse("Unable to access", 403);
    return;
  }
  next();
};
