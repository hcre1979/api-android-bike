var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/status', function (req, res, next) {
  var responseObject = { status: 'OK' };
  res.send(responseObject);
});
 
module.exports = router;
