import { UserService } from '../../services/user.service.js';
import { PostService } from '../../services/post.service.js';
import { LikeService } from '../../services/like.service.js';
import { CommentService } from '../../services/comment.service.js';

const schema = {
  schema: {
    tags: ['Test'],
    // ....
  },
};

export default async fastify => {
  const userService = new UserService();
  const postService = new PostService();
  const commentService = new CommentService();
  const likeService = new LikeService();

  fastify.get('/', schema, async (request, reply) => {
    console.log({
      importedServices: [userService, postService, commentService, likeService],
    });

    return { test: true };
  });
};
