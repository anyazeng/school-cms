const { Router } = require("express");
const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudentById,
  deleteStudentById,
} = require("../controllers/student.controller");

const studentRouter = Router();

studentRouter.get("/", getAllStudents);
studentRouter.get("/:id", getStudentById);
studentRouter.post("/", addStudent);
studentRouter.patch("/:id", updateStudentById);
studentRouter.delete("/:id", deleteStudentById);

module.exports = studentRouter;
