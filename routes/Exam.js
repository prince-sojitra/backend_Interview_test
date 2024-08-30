var express = require('express');
var router = express.Router();
var ExamController = require('../controllers/Exam')
let AdminSequre = require('../middleware/AdminSequre')
/* GET users listing. */
router.post('/create', AdminSequre.Sequre, ExamController.Create);
router.get('/', AdminSequre.Sequre, ExamController.AllExam);
router.get('/followupdate', AdminSequre.Sequre, ExamController.FollowUpdate);
router.get('/followcount', AdminSequre.Sequre, ExamController.FollowUpdateCount);
router.get('/due', AdminSequre.Sequre, ExamController.DueExam);
router.get('/duecount', AdminSequre.Sequre, ExamController.DueExamCount);
router.delete('/:id', AdminSequre.Sequre, ExamController.Delete);
router.put('/:id', AdminSequre.Sequre, ExamController.Update);

module.exports = router;
