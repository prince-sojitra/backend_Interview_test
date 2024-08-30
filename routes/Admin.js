var express = require("express");
var router = express.Router();
var AdminController = require("../controllers/Admin");
/* GET home page. */
router.post("/signup", AdminController.Signup);
router.post("/login", AdminController.Login);
router.get("/", AdminController.AllData);
router.delete("/:id", AdminController.Delete);
router.put("/:id", AdminController.Update);

module.exports = router;
