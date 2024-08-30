var EXAM = require("../model/Exam");
exports.Create = async function (req, res, next) {
  try {
    let ExamCreate = await EXAM.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Exam create Successfull",
      data: ExamCreate,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.AllExam = async function (req, res, next) {
  try {
    let data = await EXAM.find().populate("FacultyID");
    res.status(200).json({
      status: "success",
      message: "Exam All Data Successfull",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.FollowUpdate = async function (req, res, next) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let data = await EXAM.find({
      examdate: {
        $gte: today,
        $lt: tomorrow,
      },
    }).populate("FacultyID");

    res.status(200).json({
      status: "success",
      message: "Today Follow update Exam Successful",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.FollowUpdateCount = async function (req, res, next) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let data = await EXAM.find({
      examdate: {
        $gte: today,
        $lt: tomorrow,
      },
    }).count();

    res.status(200).json({
      status: "success",
      message: "Today Follow update Exam Successful",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.DueExam = async function (req, res, next) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let data = await EXAM.find({
      examdate: {
        $lt: today,
      },
    }).populate("FacultyID");

    res.status(200).json({
      status: "success",
      message: "Due Follow update Exam Successful",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.DueExamCount = async function (req, res, next) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let data = await EXAM.find({
      examdate: {
        $lt: today,
      },
    }).count();

    res.status(200).json({
      status: "success",
      message: "Due Follow update Exam Count Successful",
      data,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.Delete = async function (req, res, next) {
  try {
    await EXAM.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "Exam delete Successfull",
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.Update = async function (req, res, next) {
  try {
    let ExamUpdate = await EXAM.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Exam update Successfull",
      data: ExamUpdate,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
