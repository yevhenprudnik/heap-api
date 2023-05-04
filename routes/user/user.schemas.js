const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const user = {
  id: typeNumber,
  email: typeString,
  username: typeString,
};

export const getUsers = {
  schema: {
    body: {
      type: 'object',
      properties: user,
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
    response: {
      '2xx': typeNumber,
    },
  },
};
