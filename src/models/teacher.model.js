const { Schema, model } = require("mongoose");
const Joi = require("joi");

const teacherSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    validate: [
      {
        validator: (email) => {
          return Joi.string().email().validate(email).error === undefined;
        },
        msg: "Invalid email format ",
      },
    ],
  },

  course: {
    ref: "Course",
    type: String,
    //unique: ture,   when create or delete unique index, always check Compass
    //if the value of 'course' might be 'null', then add aparse after adding unique
    //sparse: ture,   when create index, always check Compass
  },
});

module.exports = model("Teacher", teacherSchema);
