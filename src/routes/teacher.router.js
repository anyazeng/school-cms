const { Router } = require("express");
const {
  getAllTeachers,
  getTeacherById,
  addTeacher,
  updateTeacherById,
  deleteTeacherById,
  addTeacherToCourse,
  removeTeacherFromCourse,
} = require("../controllers/teacher.controller");

const teacherRouter = Router();

teacherRouter.get("/", getAllTeachers);
teacherRouter.get("/:id", getTeacherById);
teacherRouter.post("/", addTeacher);
teacherRouter.patch("/:id", updateTeacherById);
teacherRouter.delete("/:id", deleteTeacherById);
teacherRouter.post("/:teacherId/courses/:courseId", addTeacherToCourse);
teacherRouter.delete("/:teacherId/courses/:courseId", removeTeacherFromCourse);

module.exports = teacherRouter;
