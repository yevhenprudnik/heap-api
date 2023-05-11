export const up = knex => {
  return knex.schema.createTable('comment', table => {
    table.increments('id').primary();
    table
      .integer('authorId')
      .references('user.id')
      .notNullable()
      .onDelete('CASCADE');
    table.string('content').notNullable();
    table.integer('postId').references('post.id').onDelete('CASCADE');
    table.integer('commentId').references('comment.id').onDelete('CASCADE');
    table.enu('type', ['post', 'comment']).notNullable();
    table.timestamps(true, true);
  });
};

export const down = knex => {
  return knex.schema.dropTable('comment');
};
