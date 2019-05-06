const environment = "development";
const options = require("../knexfile.js")[environment];
const knex = require("knex")(options);

const sum = transactions => {
  let sum = 0;
  transactions.forEach(transaction => {
    if (transaction.type === "Withdraw") {
      sum += parseFloat(transaction.amount);
    }
  });
  return sum;
};

const deposit = body => {
  return knex("accounts")
    .where("card_number", body.cardNumber)
    .then(obj => {
      if (!obj[0]) {
        return "card number doesn't exist";
      } else {
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

const withdraw = body => {
  let today = new Date().toISOString().substring(0, 10) + "T00:00:00Z";

  // get today's width's
  // get acc id, balance and validate
  return knex("accounts")
    .where("card_number", body.cardNumber)
    .then(obj => {
      if (!obj[0]) {
        return "card number doesn't exist";
      } else {
        if (obj[0].PIN === parseInt(body.PIN)) {
          // get trans using acc id where date is today
          return knex("transactions")
            .where("account_id", obj[0].id)
            .andWhere("created_at", ">=", today)
            .then(transactions => {
              let total = sum(transactions);

              if (
                total + parseFloat(body.amount) <= 300 &&
                parseFloat(obj[0].balance) - parseFloat(body.amount) >= 0
              ) {
                return knex("accounts")
                  .where("card_number", body.cardNumber)
                  .update({
                    balance: knex.raw(`?? - ${body.amount}`, ["balance"])
                  })
                  .then(result => {
                    return knex("transactions")
                      .insert({
                        account_id: obj[0].id,
                        type: "Withdraw",
                        amount: body.amount
                      })
                      .then(res => {
                        return [300 - total - body.amount];
                      })
                      .catch(error => {
                        console.error(error);
                      });
                  })
                  .catch(function(err) {
                    return false;
                  });
              }
            });
        } else {
          return "Invalid PIN";
        }
      }
    });
};

module.exports = {
  deposit,
  withdraw,
  getBalanceAndTransactions
};
