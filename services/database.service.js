import db from './../db/db.js';

const user = {
  email: '',
  name: '',
  password: '',
};

export class User {
  constructor() {}

  async createUser(email, name, password) {
    const user = await db('user')
      .insert({
        email,
        name,
        password,
      })
      .returning();
    console.log('User created ');
    return user;
  }

  getUser(email, password) {
    let data = db('user')
      .where('email', email)
      .select('id', 'name')
      .then(rows => {
        rows.forEach(row => console.log(row));
      });
  }
}

export class Post {
  constructor() {}

  async createPost(title, description, author_id) {
    const [id] = await db('posts')
      .insert({
        title,
        description,
        author_id,
      })
      .returning('id');
    console.log('Post created');
    return id;
  }
}
