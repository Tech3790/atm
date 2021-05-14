const environment = "development";
const options = require("../Database/knexfile.js")[environment];
const knex = require("knex")(options);

const createUser = async data => {
  return knex("accounts")
    .select()
    .where("card_number", data.cardNumber)
    .then(rows => {
      if (rows.length === 0) {
        return knex("users")
          .insert(
            {
              first_name: data.firstname,
              last_name: data.lastname
            },
            "id"
          )
          .then(id => {
            return knex("accounts").insert({
              user_id: parseInt(id),
              card_number: data.cardNumber,
              PIN: data.PIN,
              balance: parseFloat(data.initialBalance)
            });
          });
      } else {
        return false;
      }
    })
    .catch(ex => {
      console.error(ex);
    });
};

module.exports = {
  createUser
};
