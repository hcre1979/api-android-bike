const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.get('/status', (req, res) => {
  const responseObject = { status: 'OK' };
  res.send(responseObject);
});
 
module.exports = router;
