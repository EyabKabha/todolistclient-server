var express = require('express');
var router = express.Router();

var { deleteUsers } = require('../controllers/deleteUsers')

router.delete('/', deleteUsers)

module.exports = router