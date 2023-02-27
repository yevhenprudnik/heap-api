const user = {
  email: {
    type: 'string',
  },
  password: {
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
  },
  response: {
    '2xx': {
      type: 'object',
      properties: user,
    },
  },
};
