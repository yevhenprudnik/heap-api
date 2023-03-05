const logInUser = {
  email: {
    type: 'string',
  },
  username: {
    type: 'string',
  },
};

const registerUser = {
  ...logInUser,
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
      properties: logInUser,
    },
    response: {
      '2xx': {
        type: 'object',
        properties: logInUser,
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

export const register = {
  schema: {
    description: 'Returns user or throws an error for already used credentials',
    body: {
      type: 'object',
      required: ['email', 'password', 'username'],
      properties: registerUser,
    },
    response: {
      '2xx': {
        type: 'object',
        properties: registerUser,
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
