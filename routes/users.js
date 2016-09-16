const express = require('express');

const router = express.Router();

const User = require('../lib/User');
const Coordinate = require('../lib/Coordinate');

const isAuthenticated = require('../utils/utils').isAuthenticated;

router.get('/', (req, res) => {
  res.send('users');
});

router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  const newUser = new User();
  newUser.username = username;
  newUser.password = password;
  newUser.firstname = firstname;
  newUser.lastname = lastname;

  newUser.save((err) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    return res.status(200).send();
  });
});

router.get('/dashboard', isAuthenticated, (req, res) => {
  User
  .findOne({ _id: req.session.user._id })
  .populate({
    path: 'routes',
    populate: { path: 'coordinates' }
  })
  //.populate('routes')
  .exec((err, user) => {
    if (err) return res.status(500).send(); //return handleError(err);
    return res.status(200).send(`Welcome to the super-secret API!\n${user}`);
  });
});

router.get('/debug', (req, res) => {
  User
  .find()
  .populate({
    path: 'routes',
    populate: { path: 'coordinates' }
  })
  .exec((err, user) => {
    if (err) return res.status(500).send();
    /*
    const array = [];
    user.forEach((item) => {
      array.push(item);
    });
    */

    return res.status(200).send(user);
  });
});

router.get('/debug2', (req, res) => {
  Coordinate
  .find()
  .populate('_route')
  .exec((err, route) => {
    if (err) return res.status(500).send();
    return res.status(200).send(route);
  });
});

module.exports = router;
