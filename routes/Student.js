var express = require('express');
var router = express.Router();
var StudentController = require('../controllers/Student')
let AdminSequre = require('../middleware/AdminSequre')
/* GET users listing. */
router.post('/create', AdminSequre.Sequre, StudentController.Create);
router.get('/', AdminSequre.Sequre, StudentController.AllStudent);
router.get('/count', AdminSequre.Sequre, StudentController.StudentCount);
router.get('/pendingcount', AdminSequre.Sequre, StudentController.StudentPendingCount);
router.get('/donecount', AdminSequre.Sequre, StudentController.StudentDoneCount);
router.delete('/:id', AdminSequre.Sequre, StudentController.Delete);
router.put('/:id', AdminSequre.Sequre, StudentController.Update);

module.exports = router;    
