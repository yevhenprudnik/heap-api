import { LikeService } from '../../services/like.service.js';
import * as Schemas from './like.schemas.js';

export default async (fastify, opts) => {
  const service = new LikeService();

  fastify.get('/:id', Schemas.getLikes, async (request, reply) => {
    const type = request.query.type;

    return service.search(
      {
        type,
        [type + 'Id']: request.params.id,
      },
      ['author']
    );
  });

  fastify.post(
    '/:id',
    { ...Schemas.handleLike, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const type = request.query.type;

      return service.handleLike(request.user.id, request.params.id, type);
    }
  );
};
