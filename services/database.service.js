export const createUser = (email, name, password) => {
  return 'Created';

  // return db('user').insert({
  //   email,
  //   name,
  //   password,
  // });
};

export const getUser = (email, password) => {
  return 'Found';
  // return db('user').where('email', email).select('id', 'name').first();
};

export const createPost = (title, description, authorId) => {
  return 'Created';
  // return db('posts').insert({
  //   title,
  //   description,
  //   authorId,
  // });
};
