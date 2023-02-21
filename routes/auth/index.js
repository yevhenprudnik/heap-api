import * as Handlers from './auth.handler.js'

export default async (fastify, opts) => {
  fastify.post('/', async (request, reply) => Handlers.auth(request.body));
};
