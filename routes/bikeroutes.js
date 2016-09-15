var express = require('express');
var router = express.Router();

var User = require('../lib/User');
var Route = require('../lib/Route');

var isAuthenticated = require('../utils/utils').isAuthenticated;

router.get('/', function (req, res, next) {
  res.send('routes');
});

router.post('/create', isAuthenticated, function (req, res, next) {
  var name = req.body.name;

  var newRoute = new Route();
  newRoute.name = name;

  newRoute.save(function (err, savedRoute) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    var username = req.session.user.username;
    User.findOneAndUpdate({ username: username }, {$push:{ routes: savedRoute }}, function (err, doc) {
      if (err) return res.status(500).send();
      return res.status(200).send();
    });

  });
});

module.exports = router;
