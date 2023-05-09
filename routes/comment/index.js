import { CommentService } from '../../services/comment.service.js';
import * as Schemas from './comment.schemas.js';

export default async (fastify, opts) => {
  const commentService = new CommentService();

  fastify.get('/', Schemas.getComments, async (request, reply) => {
    return commentService.search(request.query, ['author']);
  });

  fastify.get('/:id', Schemas.getComment, async (request, reply) => {
    const { id } = request.params;
    return commentService.getOne({ id }, ['author']);
  });

  fastify.post(
    '/',
    { ...Schemas.createComment, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const { content, postId } = request.body;

      return commentService.create({
        authorId: request.user.id,
        postId,
        content,
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

      return commentService.update(id, { content });
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

      return commentService.deleteById(id);
    }
  );
};
