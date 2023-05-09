import { UserService } from '../../services/user.service.js';
import * as Schemas from './user.schemas.js';
import fastifyCors from '@fastify/cors';

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
      const { username } = request.body;

      return service.update(id, { username });
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
