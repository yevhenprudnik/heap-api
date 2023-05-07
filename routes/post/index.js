import { PostService } from '../../services/post.service.js';
import * as Schema from './post.schemas.js';

export default async (fastify, opts) => {
  const service = new PostService();

  fastify.get('/:id', Schema.getPost, async (request, reply) => {
    const { id } = request.params;

    return service.getOne({ id }, ['author', 'comments.author']);
  });

  fastify.get('/', Schema.getPosts, async (request, reply) => {
    return service.search(request.query, ['author']);
  });

  fastify.post(
    '/',
    { ...Schema.createPost, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const { content } = request.body;

      return service.create({ content, authorId: request.user.id });
    }
  );

  fastify.patch(
    '/:id',
    {
      ...Schema.updatePost,
      preHandler: [fastify.useAccessAuth, fastify.usePostOwnership],
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
      ...Schema.deletePost,
      preHandler: [fastify.useAccessAuth, fastify.usePostOwnership],
    },
    async (request, reply) => {
      const { id } = request.params;

      return service.deleteById(id);
    }
  );
};
