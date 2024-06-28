const Router = require("express");
const studentRouter = require("./student.router");
const courseRouter = require("./course.router");
const teacherRouter = require("./teacher.router");

const v1Router = Router();

v1Router.use("/students", studentRouter);
v1Router.use("/courses", courseRouter);
v1Router.use("/teachers", teacherRouter);

module.exports = v1Router;
