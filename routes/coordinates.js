var express = require('express');
var router = express.Router();

var User = require('../lib/User');
var Route = require('../lib/Route');
var Coordinate = require('../lib/Coordinate');

var isAuthenticated = require('../utils/utils').isAuthenticated;

router.get('/', function (req, res, next) {
  res.send('coordinates');
});

router.post('/create', isAuthenticated, function (req, res, next) {
  var lat = req.body.lat;
  var lon = req.body.lon;

  var routeId = req.body.routeId;

  var newCoord = new Coordinate();
  newCoord.lat = lat;
  newCoord.lon = lon;

  newCoord.save(function (err, savedCoord) {
    if (err) return res.status(500).send();

    Route.findOneAndUpdate({ _id: routeId }, {$push:{ coordinates: savedCoord }}, function (err, doc) {
      if (err) return res.status(500).send();
      return res.status(200).send();
    });
  });
});

module.exports = router;
