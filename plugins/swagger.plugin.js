import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { API_URL } from '../environment.js';

export default fp(async fastify => {
  await fastify.register(swagger, {
    swagger: {
      info: {
        title: 'Heap API',
      },
      host: API_URL,
      schemes: ['http'],
      securityDefinitions: {
        ApiToken: {
          description: 'Authorization header token, sample: "Bearer #ACCESS_TOKEN# #REFRESH_TOKEN#"',
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  await fastify.register(swaggerUi, {
    routePrefix: '/documentation',
  });

  console.log('Swagger plugin registered');
});
