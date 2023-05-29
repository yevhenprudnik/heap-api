import { PostService } from '../../services/post.service.js';
import * as Schemas from './post.schemas.js';

export default async (fastify, opts) => {
  const service = new PostService();

  fastify.get('/:id', Schemas.getPost, async (request, reply) => {
    const { id } = request.params;

    return service.getOne({ id }, ['author', 'comments.author']);
  });

  fastify.get('/', Schemas.getPosts, async (request, reply) => {
    return service.search(request.query, ['author']);
  });

  fastify.post(
    '/',
    { ...Schemas.createPost, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      const { content, url } = request.body;

      return service.create({ content, authorId: request.user.id, url });
    }
  );

  fastify.patch(
    '/:id',
    {
      ...Schemas.updatePost,
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
      ...Schemas.deletePost,
      preHandler: [fastify.useAccessAuth, fastify.usePostOwnership],
    },
    async (request, reply) => {
      const { id } = request.params;

      return service.deleteById(id);
    }
  );
};
