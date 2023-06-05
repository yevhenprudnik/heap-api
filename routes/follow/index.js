import * as Schemas from './follow.schemas.js';
import { FollowService } from '../../services/follow.service.js';

export default async (fastify, opts) => {
  const service = new FollowService();

  fastify.get('/', Schemas.getFollow, async (request, reply) => {
    return service.search(request.query, ['author', 'user']);
  });

  fastify.post(
    '/:userId',
    {
      ...Schemas.follow,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      return service.follow(request.user.id, request.params.userId);
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
