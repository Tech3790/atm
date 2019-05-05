exports.up = function(knex, Promise) {
  return knex.schema.createTable("transactions", function(table) {
    table.increments().primary();
    table
      .integer("account_id")
      .references("id")
      .inTable("accounts")
      .notNull()
      .onDelete("cascade");
    table.string("type");
    table.decimal("amount");
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("transactions");
};
