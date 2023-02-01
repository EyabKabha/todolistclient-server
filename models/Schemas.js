const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    entryDate: { type: Date, default: Date.now }
})

const myCashData = Schema({
    date: { type: String, required: true },
    amount: { type: String, required: true },
    for: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'login' }
})

const myCheckData = Schema({
    date: { type: String, required: true },
    dateofcheck: { type: String, required: true },
    numberofcheck: { type: String, required: true },
    amount: { type: String, required: true },
    for: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'login' }
})

const myCreditData = Schema({
    date: { type: String, required: true },
    amount: { type: String, required: true },
    payments: { type: String, required: true },
    for: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'login' }
})

const myWorkers = Schema({
    name: { type: String, required: true },
    amount: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'login' }
})


const mySumPayments = Schema({
    totalcash: { type:Number,default: 0 },
    totalchecks: { type: Number, default: 0 },
    totalcredit: { type: Number, default: 0 },
    user_id: { type: Schema.Types.ObjectId, ref: 'login', unique: true }
})

const Users = mongoose.model('login', UserSchema, 'login');
const cashData = mongoose.model('mycashdata', myCashData, 'mycashdata');
const checkData = mongoose.model('mycheckdata', myCheckData, 'mycheckdata')
const creditData = mongoose.model('mycreditdata', myCreditData, 'mycreditdata')
const myWorkersData = mongoose.model('myworkersdata', myWorkers, 'myworkersdata')
const myPayment = mongoose.model('sumpayments', mySumPayments, 'sumpayments')

const mySchema = { 'Users': Users, 'cashData': cashData, 'checkData': checkData, 'creditData': creditData, 'myWorkersData': myWorkersData, 'myPayment': myPayment }

module.exports = mySchema;
