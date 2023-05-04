const typeString = { type: 'string' };

const user = {
  email: typeString,
  username: typeString,
  password: typeString,
};

export const check = {
  description: 'Returns user or throws an error for wrong credentials',
  schema: {
    body: {
      type: 'object',
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
