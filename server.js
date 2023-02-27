'use strict';

import {} from 'dotenv/config';
import Fastify from 'fastify';
import app from './app.js';
import { PORT, HOST } from './environment.js';

const server = Fastify({
  logger: false,
  pluginTimeout: 10000,
});

server.register(app);

server.listen({ port: PORT, host: HOST }, err => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
