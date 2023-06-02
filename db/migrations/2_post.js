export const up = knex => {
  return knex.schema.createTable('post', table => {
    table.increments('id').primary();
    table.text('content').notNullable();
    table
      .integer('authorId')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE');
    table.string('url');
    table.timestamps(true, true);
  });
};

export const down = knex => {
  return knex.schema.dropTable('post');
};
