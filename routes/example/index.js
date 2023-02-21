import * as Handlers from './example.handlers.js';
import * as Schemas from './example.schemas.js';

export default async (fastify, opts) => {
  fastify.get('/', async (request, reply) => Handlers.getHandler());

  fastify.post('/', Schemas.postSchema, async (request, reply) =>
    Handlers.postHandler(request.body)
  );
};
