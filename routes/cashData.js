var express = require('express');
var router = express.Router();
var { addNewCash, getAllCash } = require('../controllers/cashData')

router.post('/mycashdata/:_id',addNewCash)
router.get('/cashdata/:_id',getAllCash)
module.exports = router
