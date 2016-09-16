const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

require('env2')(path.join(__dirname, 'env.json'));

const session = require('express-session');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const connection = 
`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@` +
`${process.env.DB_HOST}/${process.env.DB_NAME}`;

mongoose.connect(connection, (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log('Successfully connected to MongoDB!');
});

const routes = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const bikeroutes = require('./routes/bikeroutes');
const coordinates = require('./routes/coordinates');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'sta6r+3uwRaw', resave: false, saveUninitialized: true }));
app.use(express.static(path.join(__dirname, 'public')));

const prefix = process.env.ROUTE_PREFIX;
app.use(`${prefix}/`, routes);
app.use(`${prefix}/users`, users);
app.use(`${prefix}/auth`, auth);
app.use(`${prefix}/routes`, bikeroutes);
app.use(`${prefix}/coordinates/`, coordinates);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
