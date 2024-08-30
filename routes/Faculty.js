var express = require('express');
var router = express.Router();
var FacultyController = require('../controllers/Faculty')
let AdminSequre = require('../middleware/AdminSequre')
/* GET home page. */
router.post('/create', AdminSequre.Sequre, FacultyController.Create);
router.get('/', AdminSequre.Sequre, FacultyController.AllFaculty);
router.delete('/:id', AdminSequre.Sequre, FacultyController.Delete);
router.put('/:id', AdminSequre.Sequre, FacultyController.Update);

module.exports = router;
