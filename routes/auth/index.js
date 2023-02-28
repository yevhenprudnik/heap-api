import * as Schemas from './auth.schemas.js';
import { AuthService } from '../../services/auth.service.js';

export default async (fastify, opts) => {
  const service = new AuthService(fastify.knex);

  fastify.post('/', Schemas.login, async (request, reply) => {
    const { email, password } = request.body;

    const user = await service.logIn(email, password);

    return user;
  });

  fastify.post('/register', Schemas.register, async (request, reply) => {
    const { email, password, username } = request.body;

    const user = await service.register(email, password, username);

    return user;
  });
};
