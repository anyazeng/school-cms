const CourseModel = require("../models/course.model");
const createLogger = require("../utils/logger");
const logger = createLogger(__filename);
const Joi = require("joi");
/**
 * Error handling
 * 1.callback
 *  CourseModel.find().exec((err, courses)=>{
 * if (err) {
 * res.status(500).json({error:"xxx"})
 * }
 * //handle success response
 * })
 *
 * 2.promise
 *     CourseModel.find().exec.then((coursses)=?{}).catch((err)=>res.status(500)...)
 * 3.async await
 *     try {
 *     const courses = await Course.Model.find().exec();
 *     } catch (e) {
 *      res.status(500)
 *      }
 */

const getAllCourses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    const skip = (page - 1) * pageSize;
    const courses = await CourseModel.find().limit(pageSize).skip(skip).exec();
    res.formatResponse(courses);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findById(id).exec();
    if (!course) {
      res.formatResponse("Course not found", 404);
      return;
    }
    res.formatResponse(course);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const addCourse = async (req, res, next) => {
  try {
    // const { code, name, description } = req.body;
    //data validation
    const schema = Joi.object({
      name: Joi.string().min(2).max(255).required(),
      description: Joi.string().optional(),
      code: Joi.string()
        .regex(/^[a-zA-Z]+[0-9]+$/)
        .message("Expecting something like COMP001")
        .uppercase()
        .required(),
      //has been tested by regex101
    });
    const validatedBody = await schema.validateAsync(req.body, {
      allowUnknown: true,
      stripUnknown: true,
    });

    const course = new CourseModel(validatedBody);
    await course.save(); //TODO:need to error handeller
    res.formatResponse(course, 201);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const updateCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const course = await CourseModel.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    ).exec();
    if (!course) {
      res.formatResponse("Course not found", 404);
      return;
    }
    res.formatResponse(course);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const deleteCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findByIdAndDelete(id).exec();
    if (!course) {
      res.formatResponse("Course not found", 404);
      return;
    }
    res.formatResponse(course, 204);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
};
