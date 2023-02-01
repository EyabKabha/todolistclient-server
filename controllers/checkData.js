const Schema = require('../models/Schemas.js');

const addNewCheck = async (req, res) => {
    try {

        const newCheckData = await new Schema.checkData({
            date: req.body.date,
            dateofcheck: req.body.dateOfCheck,
            numberofcheck: req.body.checkNum,
            amount: req.body.amount,
            for: req.body.for,
            user_id:req.params._id
        })

        await newCheckData.save((err, newCheckResults) => {
            if (err) return res.status(400).json(err.message);
            res.status(200).json('Check Data successfully created!');
        });
        const sumpayments = Schema.myPayment;
        const myCurrentValue = await sumpayments.find({user_id:req.params._id},{"totalchecks": 1 })
        const data = await sumpayments.updateOne({user_id:req.params._id}, {$set:{"totalchecks":parseInt(req.body.amount)+myCurrentValue[0].totalchecks}})
    } catch (error) {
        throw res.status(500)
    }
}

const getAllCheck = async (req, res) => {

    try {
        const checkSchema = Schema.checkData;
        const newCheckData = await checkSchema.find({ "user_id": { $eq: req.params._id } });
        if (newCheckData) {
            res.status(200).json(newCheckData)
        }
    } catch (error) {
        throw res.status(500)
    }
}

module.exports = { addNewCheck, getAllCheck };