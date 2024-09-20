var express = require('express');
var router = express.Router();
var StudentController = require('../controllers/Student')
let AdminSequre = require('../middleware/AdminSequre')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/resume')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

/* GET users listing. */
router.post('/create', upload.single('resume'), AdminSequre.Sequre, StudentController.Create);
router.get('/', AdminSequre.Sequre, StudentController.AllStudent);
router.get('/count', AdminSequre.Sequre, StudentController.StudentCount);
router.get('/pendingcount', AdminSequre.Sequre, StudentController.StudentPendingCount);
router.get('/donecount', AdminSequre.Sequre, StudentController.StudentDoneCount);
router.delete('/:id', AdminSequre.Sequre, StudentController.Delete);
router.put('/:id', AdminSequre.Sequre, StudentController.Update);

module.exports = router;    
