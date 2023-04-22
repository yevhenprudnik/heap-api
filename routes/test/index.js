import { UserService } from '../../services/user.service.js';
import { PostService } from '../../services/post.service.js';
import { LikeService } from '../../services/like.service.js';

export default async (fastify, opts) => {
  const userService = new UserService();
  const postService = new PostService();
  const likeService = new LikeService();

  fastify.get('/user', async (request, reply) => {
    return userService.search({}, []);
  });

  fastify.get('/post', async (request, reply) => {
    return postService.search({}, ['user', 'likes']);
  });

  fastify.get('/user-posts', async (request, reply) => {
    // hardcode, just for testing:
    const userId = 2;

    return postService.search(
      {
        authorId: userId,
      },
      ['user', 'likes']
    );
  });

  fastify.get('/like', async (request, reply) => {
    return likeService.search({});
  });

  fastify.post('/like', async (request, reply) => {
    return likeService.create(request.body);
  });
};
