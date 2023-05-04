export const up = knex => {
  return knex.schema.createTable('post', table => {
    table.increments('id').primary();
    table.string('content').notNullable();
    table.integer('authorId').references('user.id').notNullable();
    table.timestamps(true, true);
    table.onDelete('CASCADE');
  });
};

export const down = knex => {
  return knex.schema.dropTable('post');
};
