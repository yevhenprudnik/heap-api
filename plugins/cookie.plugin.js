'use strict';
import fp from 'fastify-plugin';
import cookie from '@fastify/cookie';
import { SECRET_KEY_COOKIE } from '../environment.js';

export default fp(async (fastify, options) => {
  fastify.register(cookie, {
    secret: SECRET_KEY_COOKIE,
  });

  console.log('Cookie plugin register');
});
