const CourseModel = require("../models/course.model");

const getAllCourses = async (req, res, next) => {
  const courses = await CourseModel.find().exec();
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
  const { _id, name, description } = req.body;
  const course = new CourseModel({ _id, name, description });
  await course.save();
  res.formatResponse(course, 201);
};

const updateCourseById = async (req, res, next) => {
  const { id } = req.params;
  const { _id, name, description } = req.body;
  const course = await CourseModel.findByIdAndUpdate(
    id,
    {
      _id,
      name,
      description,
    },
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
