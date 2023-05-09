import * as Schemas from './follower.schemas.js';
import { FollowerService } from '../../services/follower.service.js';

export default async (fastify, opts) => {
  const service = new FollowerService();

  fastify.post(
    '/:userId',
    {
      ...Schemas.follow,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      const authorId = request.user.id;
      const { userId } = request.params;

      return service.follow({ authorId, userId });
    }
  );

  fastify.delete(
    '/:id',
    {
      ...Schemas.unfollow,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      const { id } = request.params;

      return service.deleteById(id);
    }
  );
};
