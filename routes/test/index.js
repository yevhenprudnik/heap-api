import { UserService } from '../../services/user.service.js';
import { PostService } from '../../services/post.service.js';
import { LikeService } from '../../services/like.service.js';
import { CommentService } from '../../services/comment.service.js';

export default async fastify => {
  const userService = new UserService();
  const postService = new PostService();
  const likeService = new LikeService();
  const commentService = new CommentService();

  fastify.get('/user', async (request, reply) => {
    return userService.search({}, []);
  });

  fastify.get('/post', async (request, reply) => {
    return postService.search({}, ['author', 'likes']);
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

  fastify.post(
    '/like',
    { preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      return likeService.create({
        authorId: request.user.id,
        postId: request.body.postId,
      });
    }
  );
};
