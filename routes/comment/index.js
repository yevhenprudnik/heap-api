import { CommentService } from '../../services/comment.service.js';
import * as Schema from './comment.schemas.js';
export default async (fastify, opts) => {
  const service = new CommentService();

  fastify.get('/', Schema.getComments, async (request, reply) => {
    return service.search(request.query, ['author']);
  });

  fastify.get('/:id', Schema.getComment, async (request, reply) => {
    const { id } = request.params;
    return service.getOne({ id }, ['author']);
  });

  fastify.post(
    '/',
    { ...Schema.createComment, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const { content, postId } = request.body;

      return service.create({
        authorId: request.user.id,
        postId,
        content,
      });
    }
  );

  fastify.patch(
    '/:id',
    {
      ...Schema.updateComment,
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
      ...Schema.deleteComment,
      preHandler: [fastify.useAccessAuth, fastify.useCommentOwnership],
    },
    async (request, reply) => {
      const { id } = request.params;

      return service.deleteById(id);
    }
  );
};