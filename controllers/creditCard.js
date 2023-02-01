const Schema = require('../models/Schemas.js');

const addNewCredit = async (req,res) => {
    
    try {

        const newCreditData = await new Schema.creditData({
            date: req.body.date,
            amount: req.body.amount,
            payments:req.body.payments,
            for: req.body.for,
            user_id: req.params._id
        })

        await newCreditData.save((err, newCreditResults) => {
            if (err) return  res.status(400).json(err.message);
            res.status(200).json('Credit Data successfully created!');
        });

        const sumpayments = Schema.myPayment;
        const myCurrentValue = await sumpayments.find({user_id:req.params._id},{"totalcredit": 1 })
        const data = await sumpayments.updateOne({user_id:req.params._id}, {$set:{"totalcredit":parseInt(req.body.amount)+myCurrentValue[0].totalcredit}})
        
    } catch (error) {
        throw res.status(500)
    }
}

const getAllCredit = async (req,res) => {

    try {
    
        const creditSchema = Schema.creditData;
        const newCredit = await creditSchema.find({"user_id":{$eq:req.params._id}});
       
        if(newCredit){
            res.status(200).json(newCredit)
        }
    } catch (error) {
        throw res.status(500)
    }
}

module.exports = { addNewCredit ,getAllCredit};
