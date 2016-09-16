const express = require('express');

const router = express.Router();

const User = require('../lib/User');

router.get('/', (req, res) => {
  res.send('auth');
});

router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    if (!user) {
      return res.status(404).send();
    }

    user.comparePassword(password, (isMatch) => {
      if (isMatch && isMatch === true) {
        req.session.user = user;
        //console.log(user);
        return res.status(200).send();
      }

      return res.status(401).send();
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  return res.status(200).send();
});

module.exports = router;
