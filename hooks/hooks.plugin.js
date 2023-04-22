import fp from 'fastify-plugin';
import { AuthHandlersService } from './auth-handlers.service.js';

export default fp(async fastify => {
  const service = new AuthHandlersService(fastify.jwt);

  fastify.decorate('useAccessAuth', service.useTokenAuth(['access']));

  fastify.decorate('useRefreshAuth', service.useTokenAuth(['refresh']));

  console.log('Hooks plugin registered.');
});
