import { PostService } from '../../services/post.service.js';
import * as Schema from './post.schemas.js';

export default async (fastify, opts) => {
  const service = new PostService();

  fastify.post(
    '/',
    { ...Schema.createPost, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      return service.create({ ...request.body, authorId: request.user.id });
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

      return service.update(id, request.body);
    }
  );

  fastify.delete(
    '/:id',
    {
      ...Schema.deletePost,
      //preHandler: [fastify.useAccessAuth, fastify.usePostOwnership],
    },
    async (request, reply) => {
      const { id } = request.params;

      return service.deleteById(id);
    }
  );

  fastify.get('/:id', Schema.getPost, async (request, reply) => {
    const { id } = request.params;

    return service.getOne({ id });
  });

  fastify.get('/', async (request, reply) => {
    return service.search(request.query, ['user']);
  });
};
