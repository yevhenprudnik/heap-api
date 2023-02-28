export const up = knex => {
  return knex.schema.createTable('posts', table => {
    table.increments('id');
    table.string('content').notNullable();
    table.integer('authorId').references('user.id').notNullable();
    table.timestamps(true, true);
  });
};

export const down = knex => {
  return knex.schema.dropTable('posts');
};
