import { UserService } from '../../services/user.service.js';
import { PostService } from '../../services/post.service.js';
import { LikeService } from '../../services/like.service.js';

export default async fastify => {
  const userService = new UserService();
  const postService = new PostService();
  const likeService = new LikeService();

  fastify.get(
    '/user',
    { schema: { tags: ['Test'] } },
    async (request, reply) => {
      return userService.search({}, []);
    }
  );

  fastify.get(
    '/post',
    { schema: { tags: ['Test'] } },
    async (request, reply) => {
      return postService.search({}, ['author', 'likes']);
    }
  );

  fastify.get(
    '/user-posts',
    { schema: { tags: ['Test'] } },
    async (request, reply) => {
      // hardcode, just for testing:
      const userId = 2;

      return postService.search(
        {
          authorId: userId,
        },
        ['user', 'likes']
      );
    }
  );

  fastify.get(
    '/like',
    { schema: { tags: ['Test'] } },
    async (request, reply) => {
      return likeService.search({});
    }
  );

  fastify.post(
    '/like',
    { preHandler: fastify.useAccessAuth, schema: { tags: ['Test'] } },
    async (request, reply) => {
      return likeService.create({
        authorId: request.user.id,
        postId: request.body.postId,
      });
    }
  );
};
