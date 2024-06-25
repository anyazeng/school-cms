const { Schema, model } = require("mongoose");
const Joi = require("joi");

const studentSchema = new Schema({
  firstName: {
    type: String,
    //simple validation rules
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,

    //validation
    //try not to use regex, instead, use validation library
    //front-end validator.js
    //back-end Joi, Yup, we are using joi

    validate: [
      {
        validator: (email) => {
          return Joi.string().email().validate(email).error === undefined;
        },
        msg: "Invalid email format",
      },
    ],
  },
  //Bilateral binding
  //one student - many courses -> so []
  courses: [{ ref: "Course", type: String }],
  //Name of collection & type of Id
});

module.exports = model("Student", studentSchema);

//Model name: "Student"
//In database it would appear "students"，in lowercase and plural
// NOTE: Schema: Defines the structure of your documents and the data types of their fields.
// Model: Uses the Schema to create and manage documents in a specific collection
