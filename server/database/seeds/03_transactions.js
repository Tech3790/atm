const transactionsData = require('../seed_data/transactions_data')
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('transactions').insert(transactionsData);
    });
};
