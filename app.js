'use strict';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import AutoLoad from '@fastify/autoload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (fastify, opts) => {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'hooks'),
    matchFilter: path => path.endsWith('.plugin.js'),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
  });
};
