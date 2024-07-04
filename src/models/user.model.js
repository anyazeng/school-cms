const { Schema, model } = require("mongoose");

const schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  //   role: {
  //     type: String,
  //     enum: ["admin", "user"],
  //   },
});

//HASH

//Solution ONE  -  in model
//we can potentially hash our password in model
// schema.method.hashPassword = async function () {
//     this.password = await bcrypt.hash(this.password, 12);
// }
//how to use: user.hashPassword

//Solution TWO  - utils
//const hashPassword = async(password) => bcrypt.hash(password, 12);
//how to use: user.password = hashPassword(user.password)

module.exports = model("User", schema);
