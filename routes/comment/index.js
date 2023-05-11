import { CommentService } from '../../services/comment.service.js';
import * as Schemas from './comment.schemas.js';

export default async (fastify, opts) => {
  const service = new CommentService();

  fastify.get('/', Schemas.getComments, async (request, reply) => {
    return service.search(request.query, ['author', 'comments']);
  });

  fastify.get('/:id', Schemas.getComment, async (request, reply) => {
    const { id } = request.params;
    return service.getOne({ id }, ['author', 'comments']);
  });

  fastify.post(
    '/:id',
    { ...Schemas.createComment, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const { id } = request.params;
      const { type } = request.query;
      const { content } = request.body;

      const parentKey = type + 'Id';

      return service.create({
        authorId: request.user.id,
        [parentKey]: id,
        content,
        type,
      });
    }
  );

  fastify.patch(
    '/:id',
    {
      ...Schemas.updateComment,
      preHandler: [fastify.useAccessAuth, fastify.useCommentOwnership],
    },
    async (request, reply) => {
      const { id } = request.params;

      const { content } = request.body;

      return service.update(id, { content });
    }
  );

  fastify.delete(
    '/:id',
    {
      ...Schemas.deleteComment,
      preHandler: [fastify.useAccessAuth, fastify.useCommentOwnership],
    },
    async (request, reply) => {
      const { id } = request.params;

      return service.deleteById(id);
    }
  );
};
