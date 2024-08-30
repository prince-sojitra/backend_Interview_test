var express = require('express');
var router = express.Router();
var CompanyController = require('../controllers/Company')
let AdminSequre = require('../middleware/AdminSequre')
/* GET home page. */
router.post('/create', AdminSequre.Sequre, CompanyController.Create);
router.get('/', AdminSequre.Sequre, CompanyController.AllCompany);
router.get('/count', AdminSequre.Sequre, CompanyController.CompanyCount);
router.delete('/:id', AdminSequre.Sequre, CompanyController.Delete);
router.put('/:id', AdminSequre.Sequre, CompanyController.Update);

module.exports = router;
