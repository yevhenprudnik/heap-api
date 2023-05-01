const typeString = { type: 'string' };

const user = {
  email: typeString,
  username: typeString,
  password: typeString,
};

const userProperties = {
  user: {
    type: 'object',
    properties: {
      email: typeString,
      username: typeString,
      password: typeString,
    },
  },
};

export const check = {
  description: 'Returns user or throws an error for wrong credentials',
  schema: {
    body: {
      type: 'object',
      properties: user,
    },
    responce: {
      '2xx': {
        type: 'object',
        properties: userProperties,
      },
    },
  },
};
