const express = require('express');
const router = express.Router();
const knex = require('../database/models/usersModel');

router.post('/createUser', (req, res) => {
  // console.log(typeof req.body.initialBalance);
  
  knex.createUser(req.body)
  res.sendStatus(201);
});

module.exports = router