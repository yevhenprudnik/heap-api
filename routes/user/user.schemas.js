const user = {
  email: {
    type: 'string',
    format: 'email',
  },
  username: {
    type: 'string',
    minLength: 1,
  },
};

export const getUser = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          minLength: 1,
        },
      },
      required: ['id'],
    },
    response: {
      200: {
        type: 'object',
        properties: user,
        additionalProperties: false,
      },
    },
  },
};
