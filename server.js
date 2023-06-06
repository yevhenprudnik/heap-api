'use strict';

import {} from 'dotenv/config';
import Fastify from 'fastify';
import app from './app.js';
import { PORT, HOST } from './environment.js';
import { ApiError } from './exceptions.js';

const server = Fastify({
  logger: false,
  pluginTimeout: 10000,
});

server.register(app);

server.setErrorHandler(function (error, request, reply) {
  this.log.error(error);
  if (error instanceof ApiError) {
    reply
      .status(error.statusCode)
      .send({ status: error.statusCode, message: error.message });
  }

  reply.status(500).send({ status: 500, message: 'Server error' });
});

server.listen({ port: PORT, host: HOST }, err => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
