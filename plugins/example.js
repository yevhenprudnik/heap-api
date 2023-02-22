import fp from 'fastify-plugin';
import { User, Post } from '../services/database.service.js'

const user = new User;
const post = new Post;

export default fp(async (fastify, opts) => {
  console.log('Example plugin register');
  user.createUser('ddddd@gmail.com', 'vasil', 'root');
  user.getUser('vasil@gmail.com', 'root');
  return;
});
