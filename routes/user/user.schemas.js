import { typeNumber, typeString } from '../../common/schema.types.js';

const user = {
  id: typeNumber,
  email: typeString,
  username: typeString,
  avatar: typeString,
};

export const getUsers = {
  schema: {
    tags: ['User'],
    query: {
      type: 'object',
      properties: {
        keyword: typeString,
      },
    },
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: user,
        },
      },
    },
  },
};

export const getUser = {
  schema: {
    tags: ['User'],
    params: {
      type: 'object',
      properties: {
        id: typeNumber,
      },
      required: ['id'],
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          ...user,
          followersCount: typeNumber,
          followingsCount: typeNumber,
          postCount: typeNumber,
        },
      },
    },
  },
};

export const updateUser = {
  schema: {
    tags: ['User'],
    security: [{ ApiToken: [] }],
    body: {
      type: 'object',
      properties: {
        username: typeString,
        avatar: typeString,
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: user,
      },
    },
  },
};

export const deleteUser = {
  schema: {
    tags: ['User'],
    security: [{ ApiToken: [] }],
    response: {
      '2xx': typeNumber,
    },
  },
};
