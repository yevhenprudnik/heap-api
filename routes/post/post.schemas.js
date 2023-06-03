const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const post = {
  id: typeNumber,
  content: typeString,
  authorId: typeNumber,
  url: typeString,
};

const author = {
  type: 'object',
  properties: {
    id: typeNumber,
    username: typeString,
    avatar: typeString,
  },
};

const comment = {
  id: typeNumber,
  authorId: typeNumber,
  content: typeString,
  author: author,
};

const likeCount = typeNumber;

export const getPost = {
  schema: {
    tags: ['Post'],
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
          comments: {
            type: 'array',
            items: {
              type: 'object',
              properties: comment,
            },
          },
          likeCount,
        },
      },
    },
  },
};

export const getPosts = {
  schema: {
    tags: ['Post'],
    query: {
      type: 'object',
      properties: post,
    },
    response: {
      '2xx': {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            ...post,
            author,
            likeCount,
          },
        },
      },
    },
  },
};

export const createPost = {
  schema: {
    tags: ['Post'],
    security: [{ ApiToken: [] }],
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
        properties: post,
      },
    },
  },
};

export const updatePost = {
  schema: {
    tags: ['Post'],
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
        properties: post,
      },
    },
  },
};

export const deletePost = {
  schema: {
    tags: ['Post'],
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
