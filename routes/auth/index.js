import * as Schemas from "./auth.schemas.js";
import { AuthService } from "../../services/auth.service.js";

export default async (fastify) => {
  const service = new AuthService(fastify.jwt);

  fastify.get(
    "/",
    { preHandler: fastify.useAccessAuth },
    async (request, reply) => {
      return request.user;
    }
  );

  fastify.post("/sign-up", Schemas.register, async (request, reply) => {
    const { body } = request;

    return service.signUp(body);
  });

  fastify.post("/sign-in", Schemas.login, async (request, reply) => {
    const { body } = request;
    
    return service.signIn(body);
  });

  fastify.get(
    "/refresh",
    { preHandler: fastify.useRefreshAuth },
    async (request, reply) => {
      return service.refresh(request.user);
    }
  );
};
