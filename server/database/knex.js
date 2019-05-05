const environment = "development"; // || process.env.ENVIRONMENT;
const options = require("./knexfile.js")[environment];
const knex = require("knex")(options);



// const knex = require('knex')(config);

// module.exports = knex;


// module.exports = {
//     getAllUserInformation,
//     postUser,
//     updateUserProfile,
//     blockUser,
//     createTrip,
//     createChat,
//     updateChat
//   };