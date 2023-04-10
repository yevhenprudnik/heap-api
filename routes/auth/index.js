import * as Schemas from './auth.schemas.js';
import { AuthService } from '../../services/auth.service.js';
import { ValidateTokens } from '../../hooks/validateTokens.hook.js';
import { requireServerPluginFromPath } from 'fastify-cli/util.js';

export default async (fastify, opts) => {
  const service = new AuthService(fastify.knex, fastify.jwt);
  const validate = new ValidateTokens(fastify.knex, fastify.jwt);

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

  fastify.post(
    '/logIn',
    { schema: Schemas.login, preHandler: validate.validateRefresh },
    async (request, reply) => {
      const { email, password } = request.body;
      const user = await service.logIn(email, password);

      reply
        .setCookie('RefreshToken', user.refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .send(user);
    }
  );
};
