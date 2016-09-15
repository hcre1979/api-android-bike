var express = require('express');
var router = express.Router();

var User = require('../lib/User');
var Route = require('../lib/Route');
var Coordinate = require('../lib/Coordinate');

var isAuthenticated = require('../utils/utils').isAuthenticated;

router.get('/', function (req, res, next) {
  res.send('users');
});

router.post('/register', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;

  var newUser = new User();
  newUser.username = username;
  newUser.password = password;
  newUser.firstname = firstname;
  newUser.lastname = lastname;

  newUser.save(function (err, savedUser) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    return res.status(200).send();
  });
});

router.get('/dashboard', isAuthenticated, function (req, res, next) {
  User
  .findOne({ _id: req.session.user._id })
  .populate('routes')
  .exec(function (err, user) {
    if (err) return res.status(500).send(); //return handleError(err);
    return res.status(200).send('Welcome to the super-secret API!\n' + user);
  });
});

router.get('/debug', function (req, res, next) {
  User
  .find()
  .populate({
    path: 'routes',
    populate: { path: 'coordinates' }
  })
  .exec(function (err, user) {
    if (err) return res.status(500).send();
    var array = [];
    user.forEach(function(item, index) {
      array.push(item);
    });

    return res.status(200).send(array);
  });
});

router.get('/debug2', function (req, res, next) {
  Coordinate
  .find()
  .populate('_route')
  .exec(function (err, route) {
    if (err) return res.status(500).send();
    return res.status(200).send(route);
  })
});

module.exports = router;
