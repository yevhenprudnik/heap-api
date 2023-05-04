const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const user = {
  id: typeNumber,
  email: typeString,
  username: typeString,
};

const tokens = {
  accessToken: typeString,
  refreshToken: typeString,
};

export const auth = {
  schema: {
    response: {
      '2xx': {
        type: 'object',
        properties: user,
      },
    },
  },
};

export const login = {
  schema: {
    description: 'Returns user or throws an error for wrong credentials',
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        ...user,
        email: typeString,
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: tokens,
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
      properties: {
        ...user,
        email: typeString,
      },
    },
    response: {
      '2xx': {
        type: 'object',
        properties: tokens,
      },
    },
  },
};

export const refresh = {
  schema: {
    response: {
      '2xx': {
        type: 'object',
        properties: tokens,
      },
    },
  },
};
