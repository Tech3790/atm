const express = require("express");
const router = express.Router();
const knex = require("../database/models/usersModel");

router.post("/createUser", async (req, res) => {
  if (await knex.createUser(req.body)) {
    res.sendStatus(201);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
