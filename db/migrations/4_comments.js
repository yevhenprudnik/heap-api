export const up = knex => {
  return knex.schema.createTable('comment', table => {
    table.increments('id').primary();
    table
      .integer('authorId')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE');
    table.string('text').notNullable;
    table
      .integer('postId')
      .references('post.id')
      .notNullable()
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

export const down = knex => {
  return knex.schema.dropTable('comment');
};
