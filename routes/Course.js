var express = require('express');
var router = express.Router();
var CourseController = require('../controllers/Course')
let AdminSequre = require('../middleware/AdminSequre')
/* GET home page. */
router.post('/create', AdminSequre.Sequre, CourseController.Create);
router.get('/', AdminSequre.Sequre, CourseController.AllCourses);
router.delete('/:id', AdminSequre.Sequre, CourseController.Delete);
router.put('/:id', AdminSequre.Sequre, CourseController.Update);

module.exports = router;
