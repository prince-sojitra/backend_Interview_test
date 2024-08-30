var ADMIN = require("../model/Admin");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.Signup = async function (req, res, next) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 8);
    let AdminCreate = await ADMIN.create(req.body);
    var token = jwt.sign({ AdminId: ADMIN._id }, process.env.ADMIN_SECURE);
    res.status(201).json({
      status: "success",
      message: "Admin Create Successfull",
      data: AdminCreate,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.Login = async function (req, res, next) {
  try {
    let AdminEmail = await ADMIN.findOne({ email: req.body.email });
    if (!AdminEmail) {
      throw new Error("User Not Found");
    }
    let AdminPass = await bcrypt.compare(
      req.body.password,
      AdminEmail.password
    );
    if (!AdminPass) {
      throw new Error("Password invalid");
    }
    var token = jwt.sign({ AdminId: AdminEmail._id }, process.env.ADMIN_SECURE);
    res.status(200).json({
      status: "success",
      message: "User Login Successfull",
      data: AdminEmail,
      token,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};

exports.AllData = async function (req, res, next) {
  try {
    let data = await ADMIN.find();
    res.status(200).json({
      status: "success",
      message: "Admin All Data Successfull",
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
    await ADMIN.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      message: "Admin delete Successfull",
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
    req.body.password = await bcrypt.hash(req.body.password, 8);
    let AdminUpdate = await ADMIN.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      message: "Admin update Successfull",
      data: AdminUpdate,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
