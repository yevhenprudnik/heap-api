import { UserService } from '../../services/user.service.js';
import * as Schemas from './user.schemas.js';

export default async (fastify, opts) => {
  const service = new UserService();

  fastify.get('/:id', Schemas.getUser, async (request, reply) => {
    const { id } = request.params;

    return service.getOne({ id });
  });

  fastify.get('/', Schemas.getUsers, async (request, reply) => {
    return service.search(request.query);
  });

  fastify.patch(
    '/',
    {
      ...Schemas.updateUser,
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
      ...Schemas.deleteUser,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      const { id } = request.user;

      return service.deleteById(id);
    }
  );
};
