var express = require('express');
var router = express.Router();

var { getAllPayments } = require('../controllers/totalpayments');

// router.put('/total/:_id', updatePayment)
router.get('/all/:_id',getAllPayments)

module.exports = router
