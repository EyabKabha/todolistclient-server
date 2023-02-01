var express = require('express');
var router = express.Router();
const Schema = require('../models/Schemas.js');
/* GET users listing. */
const { encrypt } = require('../controllers/encrypt');
const moment = require('moment')
router.get('/', async function (req, res, next) {
  const myusers = await Schema.Users
  const myData = await myusers.find()
  res.send(myData);

});

router.post('/new', async (req, res, next) => {
  const myLogin = req.body;
  console.log(myLogin.myLoginData.first_name)
  const newUser = new Schema.Users({
    first_name:myLogin.myLoginData.first_name,
    last_name:myLogin.myLoginData.last_name,
    email: myLogin.myLoginData.email,
    password: encrypt(myLogin.myLoginData.password),
    entryDate: moment().add('2', 'hour')
  })

  try {
    await newUser.save((err, data) => {
      if (err) throw err;
      console.log(data)
      res.send(data)
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;

