'use strict';

import fp from 'fastify-plugin';
import knex from 'knex';
import { DB_CONNECTION } from '../environment.js';

export default fp((fastify, options, done) => {
  if (!fastify.knex) {
    const Knex = knex({
      client: 'pg',
      useNullAsDefault: true,
      connection: DB_CONNECTION,
    });
    fastify.decorate('knex', Knex);

    fastify.addHook('onClose', (fastify, done) => {
      if (fastify.knex === Knex) {
        fastify.knex.destroy(done);
      }
    });
  }
  console.log('Connected to database');
  done();
});
