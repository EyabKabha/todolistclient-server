var express = require('express');
var router = express.Router();

var { loginAccount } = require('../controllers/login')

router.post('/', loginAccount)

module.exports = router
