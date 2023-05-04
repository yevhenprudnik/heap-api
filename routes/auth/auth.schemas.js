const typeString = { type: 'string' };

const user = {
  email: typeString,
  username: typeString,
  password: typeString,
};

export const account = {
  schema: {
    '2xx': {
      type: 'object',
      response: {
        properties: user,
      },
    },
  },
};

export const refresh = {
  schema: {
    '2xx': {
      type: 'object',
      response: {
        accessToken: typeString,
        refreshToken: typeString,
      }
    }
  }
}

const authInUser = {
  user: {
    type: 'object',
    properties: {
      email: typeString,
      username: typeString,
    },
  },
  accessToken: typeString,
  refreshToken: typeString,
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
        properties: authInUser,
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
      properties: user,
    },
    response: {
      '2xx': {
        type: 'object',
        properties: authInUser,
      },
    },
  },
};
