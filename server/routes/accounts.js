const express = require("express");
const router = express.Router();
const knex = require("../database/models/accountsModel");

router.post("/deposit", (req, res) => {
  knex.deposit(req.body).then(data => {
    console.log("dep data is:");
    const {smthng} = req.body
    console.log(smthng);
    if (data === 1) {
      res.sendStatus(201);
    } else if (typeof data === "string") {
      res.send(data);
    } else {
      res.sendStatus(401);
    }
  });
});

router.post("/withdraw", (req, res) => {
  knex.withdraw(req.body).then(data => {
    if (typeof data === "object") {
      res.send(data);
    } else if (typeof data === "string") {
      res.send(data);
    } else {
      res.sendStatus(401);
    }
  });
});

router.post("/getTransactions", (req, res) => {
  knex.getBalanceAndTransactions(req.body).then(data => {
    res.send(data);
  });
});

module.exports = router;
