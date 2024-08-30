var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/Index");
var adminRouter = require("./routes/Admin");
var StudentRouter = require("./routes/Student");
var CourseRouter = require("./routes/Course");
var InterviewRouter = require("./routes/Interview");
var CompanyRouter = require("./routes/Company");
var FacultyRouter = require("./routes/Faculty");
var ExamRouter = require("./routes/Exam");
require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DBLINK)
  .then(() => {
    console.log("DB Connected!");
  })
  .catch((error) => {
    console.log(error.message);
  });
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src 'self' https: http:");
  next();
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/student", StudentRouter);
app.use("/course", CourseRouter);
app.use("/interview", InterviewRouter);
app.use("/company", CompanyRouter);
app.use("/faculty", FacultyRouter);
app.use("/exam", ExamRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
