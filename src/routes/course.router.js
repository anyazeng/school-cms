const { Router } = require("express");
const {
  getAllCourses,
  getCourseById,
  updateCourseById,
  addCourse,
  deleteCourseById,
} = require("../controllers/course.controller");

const courseRouter = Router();

courseRouter.get("/", getAllCourses);
courseRouter.get("/:id", getCourseById);
courseRouter.patch("/:id", updateCourseById);
courseRouter.post("/", addCourse);
courseRouter.delete("/:id", deleteCourseById);

module.exports = courseRouter;
