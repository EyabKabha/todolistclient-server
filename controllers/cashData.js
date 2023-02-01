const Schema = require('../models/Schemas.js');

const addNewCash = async (req, res) => {

    try {

        const newCashData = await new Schema.cashData({
            date: req.body.date,
            amount: req.body.amount,
            for: req.body.for,
            user_id:req.params._id
        })

        await newCashData.save((err, newCashResults) => {
            if (err) return res.status(400).json(err.message);
            res.status(200).json('Cash Data successfully created!');
        });


        const sumpayments = Schema.myPayment;
        const myCurrentValue = await sumpayments.find({user_id: req.params._id},{"totalcash": 1 })
        const data = await sumpayments.updateOne({user_id: req.params._id}, {$set:{"totalcash":parseInt(req.body.amount)+myCurrentValue[0].totalcash}})
        
    } catch (error) {
        throw res.status(500)
    }
}

const getAllCash = async (req, res) => {

    try {
        const user = Schema.Users;
        const userId = await user.findOne({ _id: req.params._id }).exec();

        const cashSchema = Schema.cashData;
        const newCashData = await cashSchema.find({ "user_id": { $eq: userId._id.valueOf() } }, { _id: 0, user_id: 0, __v: 0 });

        if (newCashData) {
            res.status(200).json(newCashData)
        }
    } catch (error) {
        throw res.status(500)
    }
}

module.exports = { addNewCash, getAllCash };
