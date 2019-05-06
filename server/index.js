const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const port = 8080;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json({ type: 'application/json' }))
app.use(require("./routes"));

app.use((req, res) => {
  res.status(404).send("Unknown Request");
});

app.listen(port, () => console.log(`app listening on port ${port}!`));
