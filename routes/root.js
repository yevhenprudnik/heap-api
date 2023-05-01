export default async (fastify) => {
  fastify.get("/", async (request, reply) => {
    return { name: "abracadabra" };
  });
};
