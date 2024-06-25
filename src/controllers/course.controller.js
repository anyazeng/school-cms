const CourseModel = require("../models/course.model");

const getAllCourses = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 2;
  const skip = (page - 1) * pageSize;
  const courses = await CourseModel.find().limit(pageSize).skip(skip).exec();
  res.formatResponse(courses);
};

const getCourseById = async (req, res, next) => {
  const { id } = req.params;
  const course = await CourseModel.findById(id).exec();
  if (!course) {
    res.formatResponse("Course not found", 404);
    return;
  }
  res.formatResponse(course);
};

const addCourse = async (req, res, next) => {
  const { code, name, description } = req.body;
  const course = new CourseModel({ code, name, description });
  await course.save(); //TODO:need to error handeller
  res.formatResponse(course, 201);
};

const updateCourseById = async (req, res, next) => {
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
};

const deleteCourseById = async (req, res, next) => {
  const { id } = req.params;
  const course = await CourseModel.findByIdAndDelete(id).exec();
  if (!course) {
    res.formatResponse("Course not found", 404);
    return;
  }
  res.formatResponse(course, 204);
};

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourseById,
  deleteCourseById,
};
