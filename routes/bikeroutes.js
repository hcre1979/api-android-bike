const express = require('express');

const router = express.Router();

const User = require('../lib/User');
const Route = require('../lib/Route');

const isAuthenticated = require('../utils/utils').isAuthenticated;

router.get('/', (req, res) => {
  res.send('routes');
});

router.post('/create', isAuthenticated, (req, res) => {
  const name = req.body.name;

  const newRoute = new Route();
  newRoute.name = name;

  newRoute.save((err, savedRoute) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    const username = req.session.user.username;
    User.findOneAndUpdate({ username }, { $push: { routes: savedRoute } }, (err, doc) => {
      if (err) return res.status(500).send();
      return res.status(200).send();
    });
  });
});

module.exports = router;
