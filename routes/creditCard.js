var express = require('express');
var router = express.Router();

var {getAllCredit,addNewCredit} = require('../controllers/creditCard')

router.post('/newcredit/:_id',addNewCredit)
router.get('/getcredit/:_id',getAllCredit)

module.exports = router
