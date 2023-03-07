import * as Schemas from './auth.schemas.js';
import { AuthService } from '../../services/auth.service.js';

export default async (fastify, opts) => {
  const service = new AuthService(fastify.knex);

  fastify.post('/login', Schemas.login, async (request, reply) => {
    const { email, password } = request.body;

    return service.logIn(email, password);
  });

  fastify.post('/register', Schemas.register, async (request, reply) => {
    const { email, password, username } = request.body;

    return service.register(email, password, username);
  });
};
