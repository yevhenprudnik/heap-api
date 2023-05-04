const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const post = {
  id: typeNumber,
  content: typeString,
  authorId: typeNumber,
};

const postProperties = {
  post: {
    type: 'object',
    properties: post,
  },
};

export const createPost = {
  description: 'Returns post or throws an error for wrong credentials',
  schema: {
    body: {
      type: 'object',
      required: ['content', 'authorId'],
      properties: post,
    },
    responce: {
      '2xx': {
        type: 'object',
        properties: postProperties,
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
    responce: {
      '2xx': {
        type: 'object',
        properties: postProperties,
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
    responce: {
      '2xx': {
        type: 'object',
        properties: {
          count: typeNumber,
        },
      },
    },
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
    responce: {
      '2xx': {
        type: 'object',
        properties: postProperties,
      },
    },
  },
};
