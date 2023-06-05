import { typeNumber } from '../../common/schema.types.js';

export const follow = {
  schema: {
    tags: ['Follower'],
    security: [{ ApiToken: [] }],
    params: {
      type: 'object',
      properties: {
        userId: typeNumber,
      },
      required: ['userId'],
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          authorId: typeNumber,
          userId: typeNumber,
        },
      },
    },
  },
};

export const unfollow = {
  schema: {
    tags: ['Follower'],
    security: [{ ApiToken: [] }],
    params: {
      type: 'object',
      properties: {
        id: typeNumber,
      },
      required: ['id'],
    },
    response: {
      '2xx': typeNumber,
    },
  },
};
