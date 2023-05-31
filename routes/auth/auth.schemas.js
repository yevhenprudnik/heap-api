const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const user = {
  id: typeNumber,
  email: typeString,
  username: typeString,
  avatar: typeString,
};

const tokens = {
  accessToken: typeString,
  refreshToken: typeString,
};

export const auth = {
  schema: {
    tags: ['Auth'],
    security: [{ ApiToken: [] }],
    response: {
      '2xx': {
        type: 'object',
        properties: user,
      },
    },
  },
};

export const signIn = {
  schema: {
    tags: ['Auth'],
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: typeString,
        password: typeString,
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

export const signUp = {
  schema: {
    tags: ['Auth'],
    body: {
      type: 'object',
      required: ['email', 'password', 'username'],
      properties: {
        email: typeString,
        username: typeString,
        password: typeString,
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
    tags: ['Auth'],
    security: [{ ApiToken: [] }],
    response: {
      '2xx': {
        type: 'object',
        properties: tokens,
      },
    },
  },
};
