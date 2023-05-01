import { UserService } from '../../services/user.service.js';
import * as Shema from './user.schemas.js';

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
      ...Shema.check,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      const id = request.user.id;

      return service.update(id, request.body);
    }
  );

  fastify.delete(
    '/',
    {
      ...Shema.check,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      const { id } = request.user.id;

      return service.delete({ id });
    }
  );
};
