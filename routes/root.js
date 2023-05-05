export default async fastify => {
  fastify.get(
    '/',
    { schema: { tags: ['Root'], description: 'Redirects to /documentation' } },
    async (request, reply) => {
      return reply.redirect('/documentation');
    }
  );
};
