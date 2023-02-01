const Schema = require('../models/Schemas.js');

const getAllPayments = async (req, res) => {
    try {
        const paymentSchema = Schema.myPayment;
        const allpaymentstable = await paymentSchema.find({ "user_id": { $eq: req.params._id } });
        if (allpaymentstable) {
            res.status(200).json(allpaymentstable)
        }else{
            res.status(404).json('No Data found')
        }
    } catch (error) {
        throw res.status(500)
    }
}
module.exports = {getAllPayments};