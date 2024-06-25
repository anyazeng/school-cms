const Joi = require("joi");

//can be reused from front end
//NOTE: front-end import export mechanism: ES6 vs back-end: common JS
const addCourseSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().optional(),
  code: Joi.string()
    .regex(/^[a-zA-Z]+[0-9]+$/)
    .message("Expecting something like COMP001")
    .uppercase()
    .required(),
  //has been tested by regex101
});

module.exports = addCourseSchema;
