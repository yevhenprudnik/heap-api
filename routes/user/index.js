import { UserService } from '../../services/user.service.js';
import * as Schema from './user.schemas.js';

export default async (fastify, opts) => {
  const service = new UserService();

  fastify.get('/', async (request, reply) => {
    return service.search(request.query);
  });

  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;

    return service.getOne({ id });
  });

  fastify.patch(
    '/',
    {
      ...Schema.check,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      const { id } = request.user;

      return service.update(id, request.body);
    }
  );

  fastify.delete(
    '/',
    {
      ...Schema.check,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      const { id } = request.user;

      return service.delete({ id });
    }
  );
};
