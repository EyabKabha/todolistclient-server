const Schema= require('../models/Schemas.js');

const addNewWorker = async (req, res) => {

    try {
        const newWorkerData = await new Schema.myWorkersData({
            name: req.body.name,
            amount: req.body.amount,
            user_id: req.params._id
        })

        await newWorkerData.save((err, newWorkerResults) => {
            if (err) return res.status(400).json(err.message);
            res.status(200).json('Worker added successfully created!');
        });

    } catch (error) {
        throw res.status(500)
    }
}

const getAllWorkers = async (req, res) => {

    try {
        const user = Schema.Users;
        const userId = await user.findOne({ _id: req.params._id }).exec();

        const workerSchema = Schema.myWorkersData;
        const workerData = await workerSchema.find({ "user_id": { $eq: userId._id } });

        workerData.sort((a, b) => a.name.normalize().localeCompare(b.name.normalize()));
        console.log(workerData);

        if (workerData) {
            res.status(200).json(workerData)
        }
    } catch (error) {
        throw res.status(500)
    }
}

module.exports = { addNewWorker, getAllWorkers };
