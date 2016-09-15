var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

require('env2')(path.join(__dirname, 'env.json'));

var prefix = process.env.ROUTE_PREFIX;

var session = require('express-session');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var connection = process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB_NAME;
mongoose.connect('mongodb://' + connection, function(err) {
  if (err) {
    return console.log(err);
  }

  return console.log('Successfully connected to MongoDB!');
});

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var bikeroutes = require('./routes/bikeroutes');
var coordinates = require('./routes/coordinates');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret:'sta6r+3uwRaw', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(prefix + '/', routes);
app.use(prefix + '/users', users);
app.use(prefix + '/auth', auth);
app.use(prefix + '/routes', bikeroutes);
app.use(prefix + '/coordinates/', coordinates);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
