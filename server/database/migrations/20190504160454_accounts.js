exports.up = function(knex, Promise) {
  return knex.schema.createTable("accounts", function(table) {
    table.increments().primary();
    table
      .integer("user_id")
      .references("id")
      .inTable("users")
      .notNull()
      .onDelete("cascade");
    table.string("card_number");
    table.integer("PIN");
    table.decimal("balance");
    table.timestamps(true, true);
    table.unique("card_number")
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("accounts");
};
