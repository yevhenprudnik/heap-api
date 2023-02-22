export const up = knex => {
  return knex.schema.createTable('user', table => {
    table.increments();
    table.string('email', 255).notNullable().unique();
    table.string('name', 50).notNullable();
    table.string('password', 50).notNullable();
    table.timestamp(true, true);
  });
};

export const down = knex => {
  return knex.schema.dropTable('user');
};
