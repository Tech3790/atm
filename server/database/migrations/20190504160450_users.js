exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", function(table) {
    table.increments("id").primary();
    table.string("first_name").notNull();
    table.string("last_name").notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
