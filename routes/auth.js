var express = require('express');
var router = express.Router();

var User = require('../lib/User');

router.get('/', function (req, res, next) {
  res.send('auth');
});

router.post('/login', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({ username: username }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(500).send();
    }

    if (!user) {
      return res.status(404).send();
    }

    user.comparePassword(password, function (isMatch) {
      if (isMatch && isMatch === true) {
        req.session.user = user;
        console.log(user);
        return res.status(200).send();
      }
      else {
        return res.status(401).send();
      }
    });
  });
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  return res.status(200).send();
});

module.exports = router;
