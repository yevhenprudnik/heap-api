export const up = function (knex) {
  return knex.schema.createTable('follower', table => {
    table.increments('id').primary();
    table
      .integer('userId')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE');
    table
      .integer('accountId')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE');
    table.unique(['userId', 'accountId'])
    table.timestamps(true, true);
  });
};

export const down = function (knex) {
  return knex.schema.dropTable('follower');
};