var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// steps.8 - start

require('dotenv').config();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
// steps.8 - start

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var employeesRouter = require('./routes/employees');
const { truncate } = require('fs/promises');
const { truncateSync } = require('fs');

var app = express();

// view engine setup
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// steps.9 - start
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// steps.9 - end

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employees', employeesRouter);

// steps.10 - start
try {
  mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: process.env.DB_NAME,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
  });
} catch(e) {
  console.log(e)
}
// steps.10 - end

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
