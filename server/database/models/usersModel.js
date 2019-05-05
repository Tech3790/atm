const environment = "development"; 
const options = require("../knexfile.js")[environment];
const knex = require("knex")(options);

const createUser = data => {
  console.log("called");

  knex("users")
    .insert({
      first_name: data.firstname,
      last_name: data.lastname
    })
    .then(console.log("done"));
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
