var express = require('express');
var router = express.Router();
var { getTotalData } = require('../controllers/totalamount')

router.get('/total/:_id',getTotalData)
module.exports = router
