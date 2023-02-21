import path from 'node:path';
import AutoLoad from '@fastify/autoload';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function (fastify, opts) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
  });
}
