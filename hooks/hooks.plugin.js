import fp from 'fastify-plugin';
import { AuthHandlersService } from './auth-handlers.service.js';
import { PostOwnershipChecker } from './post-ownership-handler.service.js';

export default fp(async fastify => {
  const authHandlersService = new AuthHandlersService(fastify.jwt);
  const postOwnershipChecker = new PostOwnershipChecker();

  fastify.decorate(
    'useAccessAuth',
    authHandlersService.useTokenAuth(['access'])
  );

  fastify.decorate(
    'useRefreshAuth',
    authHandlersService.useTokenAuth(['refresh'])
  );

  fastify.decorate('usePostOwnership', postOwnershipChecker.usePostOwnership);

  console.log('Hooks plugin registered.');
});
