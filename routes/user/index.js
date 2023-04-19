import { ValidateTokens } from '../../hooks/validateTokens.hook.js';
import { UserService } from '../../services/user.service.js';
import { getUser } from './user.schemas.js';

export default async (fastify, opts) => {
  const tokenValidation = new ValidateTokens(fastify.knex, fastify.jwt);
  const service = new UserService(fastify.knex);

  fastify.get(
    '/:id',
    {
      ...getUser,
      onRequest: async (request, reply) => {
        await tokenValidation.validateAccess(request, reply);
      },
    },
    async (request, reply) => {
      const user = await service.getUser(request.params.id);
      reply.send(user);
    }
  );
};
