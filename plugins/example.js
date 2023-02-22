import fp from 'fastify-plugin';
import * as Service from '../services/database.service.js';

export default fp(async (fastify, opts) => {
  console.log('Example plugin register');

  const user = await Service.getUser('ddddd@gmail.com');

  console.log({ user });
  return;
});
