const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const post = {
  id: typeNumber,
  content: typeString,
  authorId: typeNumber,
};

const author = {
  type: 'object',
  properties: {
    id: typeNumber,
    username: typeString,
  },
};

export const getPost = {
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
          ...post,
          author,
        },
      },
    },
  },
};

export const getPosts = {
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
        type: 'array',
        items: {
          type: 'object',
          properties: {
            ...post,
            author,
          },
        },
      },
    },
  },
};

export const createPost = {
  description: 'Returns post or throws an error for wrong credentials',
  schema: {
    body: {
      type: 'object',
      required: ['content'],
      properties: post,
    },
    response: {
      '2xx': {
        type: 'object',
        properties: post,
      },
    },
  },
};

export const updatePost = {
  schema: {
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
        properties: post,
      },
    },
  },
};

export const deletePost = {
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
