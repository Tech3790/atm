const express = require("express");
const router = express.Router();

router.use("/users", require("./users.js"));

router.use((req, res) => {
  res.status(404).send("Unknown Request");
});

module.exports = router;
