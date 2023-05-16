import fp from 'fastify-plugin';
import { AuthHandlersService } from './auth-handlers.service.js';
import { OwnershipHandler } from './ownership-handler.js';
import { PostService } from '../services/post.service.js';
import { CommentService } from '../services/comment.service.js';

export default fp(async fastify => {
  const authHandlersService = new AuthHandlersService(fastify.jwt);
  const postOwnershipHandler = new OwnershipHandler(PostService);
  const commentOwnershipHandler = new OwnershipHandler(CommentService);

  fastify.decorate(
    'useAccessAuth',
    authHandlersService.useAuth(['access'])
  );

  fastify.decorate(
    'useRefreshAuth',
    authHandlersService.useAuth(['refresh'])
  );

  fastify.decorate('usePostOwnership', postOwnershipHandler.useOwnership);

  fastify.decorate('useCommentOwnership', commentOwnershipHandler.useOwnership);

  console.log('Hooks plugin registered.');
});
