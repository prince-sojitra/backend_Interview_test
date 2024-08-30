var express = require('express');
var router = express.Router();
var InterviewController = require('../controllers/Interview')
let AdminSequre = require('../middleware/AdminSequre')
/* GET users listing. */
router.post('/create', AdminSequre.Sequre, InterviewController.Create);
router.get('/', AdminSequre.Sequre, InterviewController.AllInterview);
router.get('/followupdate', AdminSequre.Sequre, InterviewController.FollowUpdate);
router.get('/followcount', AdminSequre.Sequre, InterviewController.FollowUpdateCount);
router.get('/due', AdminSequre.Sequre, InterviewController.DueInterview);
router.get('/duecount', AdminSequre.Sequre, InterviewController.DueInterviewCount);
router.delete('/:id', AdminSequre.Sequre, InterviewController.Delete);
router.put('/:id', AdminSequre.Sequre, InterviewController.Update);

module.exports = router;
