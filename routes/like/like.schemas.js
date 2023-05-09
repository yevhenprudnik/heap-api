const typeNumber = { type: 'number' };
const typeString = { type: 'string' };

const like = {
  id: typeNumber,
  type: typeString,
  author: {
    type: 'object',
    properties: {
      id: typeNumber,
      username: typeString,
    },
  },
};

export const getLikes = {
  schema: {
    tags: ['Like'],
    security: [{ ApiToken: [] }],
    params: {
      type: 'object',
      properties: {
        id: typeNumber,
      },
      required: ['id'],
    },
    query: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['post', 'comment'],
        },
      },
      required: ['type'],
    },
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: like,
        },
      },
    },
  },
};

export const handleLike = {
  schema: {
    tags: ['Like'],
    security: [{ ApiToken: [] }],
    params: {
      type: 'object',
      properties: {
        id: typeNumber,
      },
      required: ['id'],
    },
    query: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          enum: ['post', 'comment'],
        },
      },
      required: ['type'],
    },
  },
};
