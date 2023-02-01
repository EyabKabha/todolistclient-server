const Schema = require('../models/Schemas.js');

const getTotalData = async (req, res) => {
    try {

        const workerSchema = Schema.myWorkersData;

        const cashData = await Schema.cashData.find({ "user_id": { $eq: req.params._id } });
        const dataCredit = await Schema.creditData.find({ "user_id": { $eq: req.params._id } });
        const dataCheck = await Schema.checkData.find({ "user_id": { $eq: req.params._id } });

        const myTotalAm = await workerSchema.find({ "user_id": { $eq: req.params._id } })

        allpaymentstable = [].concat(cashData, dataCredit, dataCheck)

        var holder = {};

        allpaymentstable.forEach(function (data) {
            if (holder.hasOwnProperty(data.for)) {
                holder[data.for] = holder[data.for] + parseInt(data.amount)
            } else {
                holder[data.for] = parseInt(data.amount);
            }
        });

        var obj2 = [];
        var index = 0
        for (var prop in holder) {
            obj2.push({ for: prop, amount: holder[prop], total: parseInt(myTotalAm[index].amount) });
            index += 1
        }

        for (let index = 0; index < myTotalAm.length; index++) {
            const checkUsername = element => element.for == myTotalAm[index].name;
            if (!obj2.some(checkUsername)) {
                obj2.push({ for: myTotalAm[index].name, amount: 0, total: parseInt(myTotalAm[index].amount) });
            }
        }
        
        obj2.sort((a, b) => a.for.normalize().localeCompare(b.for.normalize()));

        if (obj2) {
            res.status(200).json(obj2)
        } else {
            res.status().json('No Data found')
        }
    } catch (error) {
        throw res.status(500)
    }
}
module.exports = { getTotalData };
