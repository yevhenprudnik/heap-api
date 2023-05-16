const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const comment = {
  id: typeNumber,
  content: typeString,
  postId: typeNumber,
  commentId: typeNumber,
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
    tags: ['Comment'],
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
          replies: {
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
    },
  },
};

export const getComments = {
  schema: {
    tags: ['Comment'],
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            ...comment,
            author,
            replies: {
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
      },
    },
  },
};

export const createComment = {
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
    body: {
      type: 'object',
      required: ['content'],
      properties: {
        content: typeString,
      },
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
