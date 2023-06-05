import { typeNumber, typeString } from '../../common/schema.types.js';

const follower = {
  type: 'object',
  properties: {
    id: typeNumber,
    username: typeString,
    avatar: typeString,
  },
};

export const getFollow = {
  schema: {
    tags: ['Follower'],
    security: [{ ApiToken: [] }],
    query: {
      type: 'object',
      properties: {
        userId: typeNumber,
        authorId: typeNumber,
      },
    },
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: typeNumber,
            authorId: typeNumber,
            userId: typeNumber,
            author: follower,
            user: follower,
          },
        },
      },
    },
  },
};

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
