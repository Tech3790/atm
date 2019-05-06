const express = require("express");
const router = express.Router();
const knex = require("../database/models/accountsModel");

router.post("/deposit", (req, res) => {
  knex.deposit(req.body).then(data => {
    if (data === 1) {
      res.sendStatus(201);
    } else {
      res.sendStatus(401);
    }
  });
});

router.post("/getTransactions", (req, res) => {
  knex.getBalanceAndTransactions(req.body).then(data => {
      res.send(data)
  });
});

module.exports = router;
