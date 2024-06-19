const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
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
  },
});

module.exports = model("Student", studentSchema);

//Model name: "Student"
//In database it would appear "students"，in lowercase and plural
// NOTE: Schema: Defines the structure of your documents and the data types of their fields.
// Model: Uses the Schema to create and manage documents in a specific collection
