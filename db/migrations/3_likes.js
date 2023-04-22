export const up = knex => {
  return knex.schema.createTable('like', table => {
    table.increments('id');
    table.integer('authorId').references('user.id').notNullable();
    table.integer('postId').references('post.id').notNullable();
    table.timestamps(true, true);
  });
};

export const down = knex => {
  return knex.schema.dropTable('like');
};
