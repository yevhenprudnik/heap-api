import * as Schemas from './auth.schemas.js';
import { AuthService } from '../../services/auth.service.js';

export default async (fastify, opts) => {
  const service = new AuthService(fastify.knex, fastify.jwtAuth);

  fastify.post('/register', Schemas.register, async (request, reply) => {
    const { email, password, username } = request.body;
    const user = await service.register(email, password, username);

    reply
      .setCookie('RefreshToken', user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .send(user);
  });

  fastify.post('/logIn', Schemas.login, async (request, reply) => {
    const { email, password } = request.body;
    const user = await service.logIn(email, password);

    reply
      .setCookie('RefreshToken', user.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      })
      .send(user);
  });
};
