const StudentModel = require("../models/student.model");
const CourseModel = require("../models/course.model");
const studentRouter = require("../routes/student.router");
const createLogger = require("../utils/logger");
const { log } = require("winston");
const logger = createLogger(__filename);

//MONGODB commend line: db.collection.fine()
const getAllStudents = async (req, res, next) => {
  try {
    // NOTE:PAGINATION
    //if no page, parseInt(undifined)->NAN, NAN->false
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;
    const skip = (page - 1) * pageSize;
    const students = await StudentModel.find()
      .limit(pageSize)
      .skip(skip)
      .exec();
    //NOTE: functions chaining: why? as every function would modify the object but at the same time return a new object
    res.formatResponse(students);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
  //traditional:
  // res.formatResponse(students, 200, {
  //   pagination: { total: await StudentModel.countDocuments() },
  // });
  //infinite scroll: the pagination above + the below
  // res.formatResponse(students, 200, {
  //   pagination: xxxxx, //no data->undefined
  // });
};

//MONGODB commend line: find({_id:xxx})
const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await StudentModel.findById(id)
      .populate("courses", "name")
      .exec();
    if (!student) {
      res.formatResponse("Student not found", 404);
      return;
      //   NOTE: rmb to add return
    }
    res.formatResponse(student);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const updateStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    //TODO: data validtation
    const student = await StudentModel.findByIdAndUpdate(
      id,
      { firstName, lastName, email },
      { new: true } //NOTE:
    ).exec();
    if (!student) {
      res.formatResponse("Student not found", 404);
      return;
    }
    res.formatResponse(student);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const addStudent = async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const student = new StudentModel({ firstName, lastName, email });
    await student.save();
    res.formatResponse(student, 201);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
  //student is an object for StudentModel, a document
  //save is a document method, it will trigger validation
  //NOTE:no need use .exec()
};

const deleteStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const student = await StudentModel.findByIdAndDelete(id).exec();
    if (!student) {
      res.formatResponse("Student not found", 404);
      return;
    }
    //NOTE: Cascade delete： In relational databases, when we delete a collection, we should delete the related records in other collections.
    await CourseModel.updateMany(
      { students: student._id },
      { $pull: { students: student._id } }
    );
    res.formatResponse(student, 204);
  } catch (e) {
    logger.info(e.message);
    next(e);
  }
};

const addStudentToCourse = async (req, res, next) => {
  try {
    //1.Get ids
    const { studentId, courseId } = req.params;
    //2.Find student and course by Ids. Make sure it exits
    const student = await StudentModel.findById(studentId).exec();
    const course = await CourseModel.findById(courseId).exec();
    //3.Add student to course (check if the relation has bound)
    if (!student || !course) {
      res.formatResponse("Student or course not found", 404);
      return;
    }
    //$addToSet
    student.courses.addToSet(courseId);
    course.students.addToSet(studentId);
    //4.Save
    await student.save();
    await course.save();
    //5.Return
    res.formatResponse(student);
  } catch (e) {
    logger.info(e);
    next(e);
  }
};

const removeStudentFromCourse = async (req, res, next) => {
  try {
    const { studentId, courseId } = req.params;
    const student = await StudentModel.findById(studentId).exec();
    const course = await CourseModel.findById(courseId).exec();
    if (!student || !course) {
      res.formatResponse("Student or course not found", 404);
      return;
    }
    //$pull
    student.courses.pull(courseId);
    course.students.pull(studentId);
    await student.save();
    await course.save();
    res.formatResponse(student, 204);
  } catch (error) {
    logger.info(error);
    next(error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudentById,
  deleteStudentById,
  addStudentToCourse,
  removeStudentFromCourse,
};
