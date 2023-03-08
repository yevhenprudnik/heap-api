import * as Schemas from './auth.schemas.js';
import { AuthService } from '../../services/auth.service.js';
import jwt from 'jsonwebtoken';

export default async (fastify, opts) => {
  const service = new AuthService(fastify.knex, jwt);

  fastify.post('/login', Schemas.login, async (request, reply) => {
    const { email, password } = request.body;
    const result = await service.logIn(email, password);

    return result.user;
  });

  fastify.post('/register', Schemas.register, async (request, reply) => {
    const { email, password, username } = request.body;
    const result = service.register(email, password, username);

    return result.user;
  });
};
