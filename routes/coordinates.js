const express = require('express');

const router = express.Router();

const Route = require('../lib/Route');
const Coordinate = require('../lib/Coordinate');

const isAuthenticated = require('../utils/utils').isAuthenticated;

router.get('/', (req, res) => {
  res.send('coordinates');
});

router.post('/create', isAuthenticated, (req, res) => {
  const lat = req.body.lat;
  const lon = req.body.lon;

  const routeId = req.body.routeId;

  const newCoord = new Coordinate();
  newCoord.lat = lat;
  newCoord.lon = lon;

  newCoord.save((err, savedCoord) => {
    if (err) return res.status(500).send();

    Route.findOneAndUpdate({ _id: routeId }, { $push: { coordinates: savedCoord } }, (err, doc) => {
      if (err) return res.status(500).send();
      return res.status(200).send();
    });
  });
});

module.exports = router;
