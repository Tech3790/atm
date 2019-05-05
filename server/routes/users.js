const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello from users');
  console.log('all the way')
});

module.exports = router