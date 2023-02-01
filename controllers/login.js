const { encrypt } = require('../controllers/encrypt');
const Schema = require('../models/Schemas.js');

const jwt = require('jsonwebtoken');
require('dotenv/config')

const loginAccount = async (req, res) => {
    try {
       
        const user = Schema.Users;
        const userDeatils = await user.findOne({ email: req.body.email, password: encrypt(req.body.password) }).exec();
        if (userDeatils) {
            const { _id, first_name, last_name } = userDeatils
            jwt.sign({ _id, first_name, last_name }, process.env.ENCRYPTION_KEY, { expiresIn: process.env.EXPIREIN }, (err, token) => { res.status(200).json({ token }) });
            const myNewPayment = new Schema.myPayment({user_id:userDeatils._id.valueOf()});
            await myNewPayment.save()
        } else {
            res.status(400).json('Email or password is incorrect')
        }

    } catch (error) {
        res.status(500)
    }
}

module.exports = {
    loginAccount,
}