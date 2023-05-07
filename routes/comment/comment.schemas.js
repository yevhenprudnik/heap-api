const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const comment = {
  id: typeNumber,
  postId: typeNumber,
  text: typeString,
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
  description: 'Returns comment or throws an error for wrong credentials',
  schema: {
    body: {
      type: 'object',
      required: ['text'],
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
    body: {
      type: 'object',
      properties: {
        text: typeString,
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
