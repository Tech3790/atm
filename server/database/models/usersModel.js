const environment = "development";
const options = require("../knexfile.js")[environment];
const knex = require("knex")(options);

const createUser = data => {
  knex("users")
    .insert(
      {
        first_name: data.firstname,
        last_name: data.lastname
      },
      "id"
    )
    .then(userID =>
      knex("accounts").insert({
        user_id: parseInt(userID),
        card_number: data.cardNumber,
        PIN: data.PIN,
        balance: parseFloat(data.initialBalance)
      })
    )
    .then(console.log("user created"));
};

// update auth_id entry with all profile information
updateUserProfile = update => {
  return knex("users")
    .where({ auth_id: update.auth_id })
    .update({
      username: update.username,
      user_country: update.user_country,
      picture: update.picture,
      interests: update.interests,
      is_guide: update.is_guide,
      primary_lang: update.primary_lang,
      secondary_langs: update.secondary_langs,
      blocked: {}
    })
    .returning("*");
};

module.exports = {
  createUser
};
