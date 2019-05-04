const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const messages = [
    `--New Request:--\n`,
    `${req.method} ${req.url}\n`,
    `params: ${JSON.stringify(req.params)}\n`,
    `body: ${req.body}\n`
  ].join("");
  next();
});

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// const { users } = require("./routes");
// app.use("/", users);
// set api routes
// const { donuts, toppings, bases, types, placeOrder } = require('./routes');
// app.use('/', donuts, toppings, bases, types, placeOrder);
