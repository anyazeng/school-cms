const TeacherModel = require("../models/teacher.model");
const CourseModel = require("../models/course.model");
const createLogger = require("../utils/logger");
const courseModel = require("../models/course.model");
const { getAllCourses } = require("./course.controller");
const logger = createLogger(__filename);

//NOTE: pagination
const getAllTeachers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;
    const teachers = await TeacherModel.find()
      .limit(pageSize)
      .skip(skip)
      .exec();
    res.formatResponse(teachers);
  } catch (e) {
    logger.info("e.message");
    next(e);
  }
};

//NOTE: $populate
const getTeacherById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacher = await TeacherModel.findById(id)
      .populate("course", "name")
      .exec();
    if (!teacher) {
      res.formatResponse("Teacher not found", 404);
      return;
    }
    res.formatResponse(teacher);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

//NOTE: {new:true}
const updateTeacherById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const teacher = await TeacherModel.findByIdAndUpdate(
      id,
      { firstName, lastName, email },
      { new: true }
    ).exec();
    if (!teacher) {
      res.formatResponse("Teacher not found", 404);
      return;
    }
    res.formatResponse(teacher);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

//NOTE: new Model + await xx.save()
const addTeacher = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const teacher = new TeacherModel({ firstName, lastName, email });
    console.log(teacher);
    await teacher.save();
    res.formatResponse(teacher, 201);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

//NOTE: cascade delete
const deleteTeacherById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teacher = await TeacherModel.findByIdAndDelete(id).exec();
    if (!teacher) {
      res.formatResponse("Teacher not found", 404);
      return;
    }
    await CourseModel.updateMany(
      { teacher: teacher._id },
      { $set: { teacher: null } } //unset??
    );
    res.formatResponse(teacher, 204);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

//NOTE: $addToSet +  biliteral + save
const addTeacherToCourse = async (req, res, next) => {
  try {
    const { teacherId, courseId } = req.params;
    const teacher = await TeacherModel.findById(teacherId).exec();
    const course = await CourseModel.findById(courseId).exec();
    if (!teacher || !course) {
      res.formatResponse("Teacher or course not found", 404);
      return;
    }

    const existingTeacher = await TeacherModel.findOne({
      _id: teacherId,
    }).exec();
    if (existingTeacher.course) {
      res.formatResponse("Teacher already has a course", 400);
      return;
    }

    const existingCourse = await CourseModel.findOne({ _id: courseId }).exec();
    if (existingCourse.teacher) {
      res.formatResponse("Course already has a teacher", 400);
      return;
    }

    teacher.course = course._id;
    course.teacher = teacher._id;
    await teacher.save();
    await course.save();

    res.formatResponse(teacher);
  } catch (e) {
    logger.info(e);
    next(e);
  }
};

//NOTE: null or onSet
const removeTeacherFromCourse = async (req, res, next) => {
  try {
    const { teacherId, courseId } = req.params;
    const teacher = await TeacherModel.findById(teacherId).exec();
    const course = await CourseModel.findById(courseId).exec();
    if (!teacher || !course) {
      res.formatResponse("Teacher or course not found", 404);
      return;
    }

    teacher.course = null;
    course.teacher = null;

    await teacher.save();
    await course.save();

    res.formatResponse(teacher, 204);
  } catch (e) {
    logger.info(e);
    next(e);
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacherById,
  deleteTeacherById,
  addTeacherToCourse,
  removeTeacherFromCourse,
};
