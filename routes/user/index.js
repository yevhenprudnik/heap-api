import { UserService } from '../../services/user.service.js';
import * as Schemas from './user.schemas.js';
import { FollowerService } from '../../services/follower.service.js';
import fastifyCors from '@fastify/cors';

export default async (fastify, opts) => {
  const userService = new UserService();
  const followerService = new FollowerService();
  fastify.get('/:id', Schemas.getUser, async (request, reply) => {
    const { id } = request.params;

    return userService.getOne({ id });
  });

  fastify.get('/', Schemas.getUsers, async (request, reply) => {
    return userService.search(request.query);
  });

  fastify.patch(
    '/',
    {
      ...Schemas.updateUser,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      const { id } = request.user;
      const { username } = request.body;

      return userService.update(id, { username });
    }
  );

  fastify.delete(
    '/',
    {
      ...Schemas.deleteUser,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      const { id } = request.user;

      return userService.deleteById(id);
    }
  );

  fastify.post(
    '/follow/:accountId',
    {
      ...Schemas.follow,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      const userId = request.user.id;
      const { accountId } = request.params;

      return followerService.follow({ userId, accountId });
    }
  );

  fastify.post(
    '/unfollow/:accountId',
    {
      ...Schemas.unfollow,
      preHandler: [fastify.useAccessAuth],
    },
    async (request, reply) => {
      const userId = request.user.id;
      const { accountId } = request.params;
      return followerService.unfollow({ userId, accountId });
    }
  );
};
