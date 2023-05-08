const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const user = {
  id: typeNumber,
  email: typeString,
  username: typeString,
};

export const getUsers = {
  schema: {
    tags: ['User'],
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
        properties: user,
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

export const follow = {
  schema: {
    tags: ['User'],
    security: [{ ApiToken: [] }],
    params: {
      type: 'object',
      properties: {
        accountId: typeNumber,
      },
      required: ['accountId'],
    },
    response: {
      '2xx': {
        type: 'object',
        properties: {
          userId: typeNumber,
          accountId: typeNumber,
        },
      },
    },
  },
};

export const unfollow = {
  schema: {
    tags: ['User'],
    security: [{ ApiToken: [] }],
    params: {
      type: 'object',
      properties: {
        accountId: typeNumber,
      },
      required: ['accountId'],
    },
    response: {
      '2xx': typeNumber,
    },
  },
}
