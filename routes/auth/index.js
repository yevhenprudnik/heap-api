import * as Schemas from './auth.schemas.js';
import { AuthService } from '../../services/auth.service.js';

export default async fastify => {
  const service = new AuthService(fastify.jwt);

  fastify.get(
    '/',
    { ...Schemas.auth, preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      return request.user;
    }
  );

  fastify.post('/sign-up', Schemas.signUp, async (request, reply) => {
    const { email, username, password } = request.body;

    return service.signUp({ email, username, password });
  });

  fastify.post('/sign-in', Schemas.signIn, async (request, reply) => {
    const { email, password } = request.body;

    return service.signIn({ email, password });
  });

  fastify.get(
    '/refresh',
    { ...Schemas.refresh, preHandler: fastify.useRefreshAuth },
    async (request, reply) => {
      return service.refresh(request.user);
    }
  );
};
