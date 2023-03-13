'use strict';

import fp from 'fastify-plugin';
import { SECRET_KEY_ACCESS, SECRET_KEY_REFRESH } from '../environment.js';
import jwt from 'jsonwebtoken';

export default fp(async (fastify, opts) => {
  if (!fastify.jwt) {
    fastify.decorate('jwtAuth', {
      jwt,
      refreshKey: SECRET_KEY_REFRESH,
      accessKey: SECRET_KEY_ACCESS,
    });
    console.log('JWT-plugin registered');
  }
});
