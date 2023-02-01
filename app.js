var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cashRouter = require('./routes/cashData');
var loginRouter = require('./routes/login')
var deleteRouterUser = require('./routes/deleteUsers');
var checkRouter = require('./routes/checkData');
var creditRouter = require('./routes/creditCard');
var workerRouter = require('./routes/workers');
var mytotalRouter = require('./routes/totalpayments');
var totalAmountRouter = require('./routes/totalamount');

require('dotenv/config')

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI)

mongoose.connection.on("error", err => {
  console.log("err", err)
})

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

app.use(cors({ origin: 'http://localhost:3000' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cashData', cashRouter);
app.use('/login', loginRouter);
app.use('/deleteUsers', deleteRouterUser);
app.use('/check', checkRouter);
app.use('/credit', creditRouter);
app.use('/workers', workerRouter);
app.use('/total',mytotalRouter);
app.use('/totalamount',totalAmountRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {

  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
