import * as Schemas from './follower.schemas.js';
import { FollowerService } from '../../services/follower.service.js';
import fastifyCors from '@fastify/cors';

export default async (fastify, opts) => {
  const service = new FollowerService();

  fastify.post(
    '/follow/:userId',
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

  fastify.post(
    '/unfollow/:userId',
    {
      ...Schemas.unfollow,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      const { userId } = request.params;

      return service.deleteById(userId);
    }
  );
};
