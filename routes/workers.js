var express = require('express');
var router = express.Router();

var { addNewWorker, getAllWorkers } = require('../controllers/workers')

router.post('/new/:_id', addNewWorker)
router.get('/getall/:_id', getAllWorkers)

module.exports = router
