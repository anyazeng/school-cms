const StudentModel = require("../models/student.model");
const studentRouter = require("../routes/student.router");

//MONGODB commend line: db.collection.fine()
const getAllStudents = async (req, res, next) => {
  // NOTE:PAGINATION
  //if no page, parseInt(undifined)->NAN, NAN->false
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 2;
  const skip = (page - 1) * pageSize;
  const students = await StudentModel.find().limit(pageSize).skip(skip).exec();
  //NOTE: functions chaining: why? as every function would modify the object but at the same time return a new object
  res.formatResponse(students);
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
  const { id } = req.params;
  const student = await StudentModel.findById(id).exec();
  if (!student) {
    res.formatResponse("Student not found", 404);
    return;
    //   NOTE: rmb to add return
  }
  res.formatResponse(student);
};

const updateStudentById = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
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
};

const addStudent = async (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  const student = new StudentModel({ firstName, lastName, email });
  await student.save();
  res.formatResponse(student, 201);
  //student is an object for StudentModel, a document
  //save is a document method, it will trigger validation
  //NOTE:no need use .exec()
};

const deleteStudentById = async (req, res, next) => {
  const { id } = req.params;
  const student = await StudentModel.findByIdAndDelete(id).exec();
  if (!student) {
    res.formatResponse("Student not found", 404);
    return;
  }
  res.formatResponse(student, 204);
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudentById,
  deleteStudentById,
};
