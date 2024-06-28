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
  },
});

module.exports = model("Teacher", teacherSchema);
