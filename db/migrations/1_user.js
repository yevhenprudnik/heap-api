export const up = knex => {
  return knex.schema.createTable('user', table => {
    table.increments();
    table.string('email', 255).notNullable().unique();
    table.string('username', 50).notNullable();
    table.string('password', 255).notNullable();
    table.string('avatar');
    table.timestamps(true, true);
  });
};

export const down = knex => {
  return knex.schema.dropTable('user');
};
