const { Schema, model } = require("mongoose");

const courseSchema = new Schema({
  _id: {
    type: String, // 一般还是选择自动随机生成的 object id， 这个字段默认unique
    alias: "code", //别名, virtual property, 只存在mongoose里，便于开发
    //_id或者code不能直接被更新，操作需要复制一份，然后用新的code，删掉旧版
  },
  name: {
    type: String,
    required: true,
    // unique: true,
  },
  description: {
    type: String,
    default: "This is a description example",
    //不是required， 可以设置一个默认值，没有值传进来的时候可以用默认值
  },
});

module.exports = model("Course", courseSchema);
