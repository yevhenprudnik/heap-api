'use strict';

import {} from 'dotenv/config';
import Fastify from 'fastify';
import app from './app.js';

const server = Fastify({
  logger: false,
  pluginTimeout: 10000,
});

server.register(app);

server.listen({ port: 3000 || '127.0.0.1' || '0.0.0.0' }, err => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
