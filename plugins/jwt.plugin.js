'use strict';

import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { JWT_SECRET } from '../environment.js';

export default fp(async (fastify, opts) => {
  if (!fastify.jwt) {
    fastify.register(fastifyJwt, {
      secret: JWT_SECRET,
    });
  }

  console.log('Jwt plugin registered');
});
