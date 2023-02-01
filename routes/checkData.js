var express = require('express');
var router = express.Router();

var {addNewCheck,getAllCheck} = require('../controllers/checkData')

router.post('/newcheck/:_id',addNewCheck)
router.get('/all/:_id',getAllCheck)

module.exports = router
