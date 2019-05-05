const express = require('express');
const router = express.Router();
const knex = require('../database/models/usersModel');

router.post('/createUser', (req, res) => {
  knex.createUser(req.body)
  res.sendStatus(201);
});

module.exports = router