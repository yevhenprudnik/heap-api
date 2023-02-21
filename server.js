'use strict';

import {} from 'dotenv/config';
import Fastify from 'fastify';
import app from './app.js';

const server = Fastify({
  logger: false,
  pluginTimeout: 10000,
});

server.register(app);

server.listen(
  { port: process.env.PORT || 3000, host: process.env.HOST || '0.0.0.0' },
  err => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  }
);
