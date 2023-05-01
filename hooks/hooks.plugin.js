import fp from 'fastify-plugin';
import { AuthHandlersService } from './auth-handlers.service.js';
import { PostOwnershipChecker } from './post-handlers.service.js';

export default fp(async fastify => {
  const service = new AuthHandlersService(fastify.jwt);
  const postOwnershipChecker = new PostOwnershipChecker();

  fastify.decorate('useAccessAuth', service.useTokenAuth(['access']));

  fastify.decorate('useRefreshAuth', service.useTokenAuth(['refresh']));

  fastify.decorate(
    'checkPostOwnership',
    postOwnershipChecker.checkPostOwnership
  );

  console.log('Hooks plugin registered.');
});
