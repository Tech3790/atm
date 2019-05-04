const accountsData = require('../seed_data/accounts_data')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert(accountsData);
    });
};