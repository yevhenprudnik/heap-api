export const up = knex => {
  return knex.schema.createTable('like', table => {
    table.increments('id').primary();
    table
      .integer('authorId')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE');
    table
      .integer('postId')
      .references('post.id')
      .notNullable()
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

export const down = knex => {
  return knex.schema.dropTable('like');
};
