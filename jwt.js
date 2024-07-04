const jwt = require("jsonwebtoken");

const secret = "secret";

const payload = {
  id: "anya",
};

//1h, 1d
//15m, 1d, 7d, 30d
const token = jwt.sign(payload, secret, { expiresIn: 10 }); //10 seconds
console.log(token);
