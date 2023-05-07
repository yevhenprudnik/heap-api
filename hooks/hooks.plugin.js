import fp from 'fastify-plugin';
import { AuthHandlersService } from './auth-handlers.service.js';
import { PostOwnershipChecker } from './post-ownership-handler.service.js';
import { CommentOwnershipChecker } from './comment-handlers.service.js';

export default fp(async fastify => {
  const authHandlersService = new AuthHandlersService(fastify.jwt);
  const postOwnershipChecker = new PostOwnershipChecker();
  const commentOwnershipChecker = new CommentOwnershipChecker();

  fastify.decorate(
    'useAccessAuth',
    authHandlersService.useTokenAuth(['access'])
  );

  fastify.decorate(
    'useRefreshAuth',
    authHandlersService.useTokenAuth(['refresh'])
  );

  fastify.decorate('usePostOwnership', postOwnershipChecker.usePostOwnership);

  fastify.decorate(
    'useCommentOwnership',
    commentOwnershipChecker.useCommentOwnership
  );

  console.log('Hooks plugin registered.');
});
