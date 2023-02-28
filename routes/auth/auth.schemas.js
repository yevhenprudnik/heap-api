const user = {
  email: {
    type: 'string',
  },
  username: {
    type: 'string',
  },
};

export const login = {
  schema: {
    description: 'Returns user or throws an error for wrong credentials',
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: user,
    },
    response: {
      '2xx': {
        type: 'object',
        properties: user,
      },
    },
  },
};
export const register = {
  schema: {
    description: 'Creating a user, if the user already exists, throws an error',
    body: {
      type: 'object',
      required: ['email', 'password', 'username'],
      properties: user,
    },
    response: {
      '2xx': {
        type: 'object',
        properties: user,
      },
    },
  },
};
