var ADMIN = require("../model/Admin");
var jwt = require("jsonwebtoken");
exports.Sequre = async function (req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw new Error("Please Send Token");
    }
    var decoded = jwt.verify(token, process.env.ADMIN_SECURE);
    let checkAdmin = await ADMIN.findById(decoded.AdminId);
    if (!checkAdmin) {
      throw new Error("Admin not Found");
    }
    next();
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      message: error.message,
    });
  }
};
