var express = require('express');
var cors = require('cors');
var router = express.Router();
var employeesController = require('../controllers/employeeController');

/* GET Employees listing. */
router.get('/getemployee', employeesController.getAll);
router.get('/search/:firstname',employeesController.search);
router.post('/addemployee', employeesController.post);
router.put('/update/:id', employeesController.put);
router.delete('/delete/:id', employeesController.delete);

module.exports = router;