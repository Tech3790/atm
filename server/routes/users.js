const router = require("express").Router();
const knex = require("../database/knex");

router.get("/", (req, res) => {
  knex("users").then(users => {
    res.send(users);
  });
});

router.post("/createuser", (req, res) => {
  let name = JSON.stringify(req.body.username);
  let profilePicture = JSON.stringify(req.body.profilePicture);

  knex("users")
    .insert({ username: name, profile_picture: profilePicture })
    .then(() => {
      res.send("ok");
    });
});

module.exports = router;
