const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const comment = {
  id: typeNumber,
  postId: typeNumber,
  content: typeString,
};

const author = {
  type: 'object',
  properties: {
    id: typeNumber,
    username: typeString,
  },
};

export const getComment = {
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
        properties: {
          ...comment,
          author,
        },
      },
    },
  },
};

export const getComments = {
  schema: {
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            ...comment,
            author,
          },
        },
      },
    },
  },
};

export const createComment = {
  schema: {
    tags: ['Comment'],
    security: [{ ApiToken: [] }],
    body: {
      type: 'object',
      required: ['content'],
      properties: comment,
    },
    response: {
      '2xx': {
        type: 'object',
        properties: comment,
      },
    },
  },
};

export const updateComment = {
  schema: {
    tags: ['Comment'],
    security: [{ ApiToken: [] }],
    body: {
      type: 'object',
      properties: {
        content: typeString,
      },
    },
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
        properties: comment,
      },
    },
  },
};

export const deleteComment = {
  schema: {
    tags: ['Comment'],
    security: [{ ApiToken: [] }],
    params: {
      type: 'object',
      properties: {
        id: typeNumber,
      },
      required: ['id'],
    },
    response: {
      '2xx': typeNumber,
    },
  },
};
