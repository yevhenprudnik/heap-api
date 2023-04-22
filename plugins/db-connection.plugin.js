'use strict';

import fp from 'fastify-plugin';
import knex from 'knex';
import { Model } from 'objection';
import { DB_CONNECTION } from '../environment.js';

export default fp(async fastify => {
  if (!fastify.knex) {
    const Knex = knex({
      client: 'pg',
      useNullAsDefault: true,
      connection: DB_CONNECTION,
    });

    fastify.decorate('knex', Knex);
  }

  Model.knex(fastify.knex);

  console.log('Connected to database');
});
