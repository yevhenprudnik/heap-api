exports.up = function (knex) {
  return knex.schema.createTable('follower', table => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE');
    table
      .integer('account_id')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('follower');
};