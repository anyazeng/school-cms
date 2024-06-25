const CourseModel = require("../models/course.model");
const createLogger = require("../utils/logger");
const logger = createLogger(__filename);
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
    const { code, name, description } = req.body;
    const course = new CourseModel({ code, name, description });
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
