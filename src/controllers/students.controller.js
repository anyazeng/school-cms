const StudentModel = require("../models/student.model");
// const formatResponse = require("../middleware/formatResponse.middleware"); 还需要在这里注册吗

//MONGODB commend line: db.collection.fine()
const getAllStudents = async (req, res, next) => {
  // NOTE:PAGINATION
  const students = await StudentModel.find().exec();
  res.formatResponse(students);
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

const updateStudentsById = async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  const student = await StudentModel.findByIdAndUpdate(
    id,
    { firstName, lastName, email },
    { new: true }
  ).exec();
  if (!student) {
    res.formatResponse("Student not found", 404);
    return;
  }
  res.formatResponse(student);
};

const addStudent = async (req, res, next) => {
  const { firstName, lastName, email } = req.body;
  const student = new StudentModel({ firstName, lastName, email }).exec();
  await student.save();
  res.formatResponse(student, 201);
  //student is a object for StudentModel, a document
  //save is a document method, it will trigger validation
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
  updateStudentsById,
  deleteStudentById,
};
