const CourseModel = require("../models/course.model");
const createLogger = require("../utils/logger");
const logger = createLogger(__filename);
const Joi = require("joi");
const addCourseSchema = require("../validation/course.validation");
const StudentModel = require("../models/student.model");
const TeacherModel = require("../models/teacher.model");
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
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const courses = await CourseModel.find().limit(pageSize).skip(skip).exec();
    //if we wanna sort we can add sort
    //req.query.sort -> ?sort= -name ("-" in descending order)
    // .sort("xx", "asc")   in ascending/descending order
    res.formatResponse(courses);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await CourseModel.findById(id)
      .populate("teacher", "firstName lastName email -_id")
      .exec();
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
    // data validation
    // const schema = Joi.object({
    //   name: Joi.string().min(2).max(255).required(),
    //   description: Joi.string().optional(),
    //   code: Joi.string()
    //     .regex(/^[a-zA-Z]+[0-9]+$/)
    //     .message("Expecting something like COMP001")
    //     .uppercase()
    //     .required(),
    //   //has been tested by regex101
    // });
    const validatedBody = await addCourseSchema.validateAsync(req.body, {
      allowUnknown: true, //allow data that's not within the schema
      stripUnknown: true, //but get rid of them
    });

    const course = new CourseModel(validatedBody);
    await course.save();
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
    //NOTE: Cascade delete： In relational databases, when we delete a collection, we should delete the related records in other collections.
    await StudentModel.updateMany(
      { courses: course._id },
      { $pull: { courses: course._id } }
    );
    await TeacherModel.updateMany(
      { course: course._id },
      { $set: { course: undefined } }
    );
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
