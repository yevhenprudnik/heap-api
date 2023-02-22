import db from './../db/db.js';

export const createUser = (email, name, password) => {
  return db('user').insert({
    email,
    name,
    password,
  });
};

export const getUser = (email, password) => {
  return db('user').where('email', email).select('id', 'name').first();
};

export const createPost = (title, description, authorId) => {
  return db('posts').insert({
    title,
    description,
    authorId,
  });
};
