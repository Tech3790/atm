const environment = "development";
const options = require("../knexfile.js")[environment];
const knex = require("knex")(options);

const deposit = body => {
  return knex("accounts")
    .where("card_number", body.cardNumber)
    .then(obj => {
      if (obj[0].PIN === parseInt(body.PIN)) {
        return knex("accounts")
          .where("card_number", body.cardNumber)
          .update({
            balance: knex.raw(`?? + ${body.amount}`, ["balance"])
          })
          .then(result => {
            knex("transactions")
              .insert({
                account_id: obj[0].id,
                type: "Deposit",
                amount: body.amount
              })
              .then(res => {})
              .catch(error => {
                console.error(error);
              });
            return result;
          })
          .catch(function(err) {
            return false;
          });
      }
    });
};
const getBalanceAndTransactions = body => {
  return knex("accounts")
    .where("card_number", body.cardNumber)
    .then(obj => {
      if (obj[0].PIN === parseInt(body.PIN)) {
        return knex("transactions")
          .where("account_id", obj[0].id)
          .then(result => {
            return [result, obj[0].balance];
          })
          .catch(function(err) {
            return false;
          });
      }
    });
};
module.exports = {
  getBalanceAndTransactions,
  deposit
};
