import { PostService } from '../../services/post.service.js';
import * as Shema from './post.schemas.js';

export default async (fastify, opts) => {
  const service = new PostService();

  fastify.post(
    '/',
    { ...Shema.check, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      return service.create({ ...request.body, authorId: request.user.id });
    }
  );

  fastify.patch(
    '/:id',
    {
      preHandler: [fastify.useAccessAuth, fastify.checkPostOwnership],
    },
    async (request, reply) => {
      const { id } = request.params;

      return service.update(id, request.body);
    }
  );

  fastify.delete(
    '/',
    {
      preHandler: [fastify.useAccessAuth, fastify.checkPostOwnership],
    },
    async (request, reply) => {
      const { id } = request.body;

      return service.delete({ id });
    }
  );

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;

    return service.getOne({ id });
  });

  fastify.get('/', async (request, reply) => {
    return service.search(request.query, ['user']);
  });
};
