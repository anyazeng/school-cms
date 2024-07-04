const jwt = require("jsonwebtoken");
const config = require("../config");

//Generate token
const generateToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//Verify token
const verifyToken = (token) => {
  //verification might throw a error, so we trycatch to handle error

  try {
    //success: return payload
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    //fail: return null
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
