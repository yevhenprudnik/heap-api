const typeString = { type: 'string' };
const typeNumber = { type: 'number' };

const post = {
  content: typeString,
  authorId: typeNumber,
};

const postProperties = {
  post: {
    type: 'object',
    properties: {
      content: typeString,
      author: typeNumber,
    },
  },
};

export const check = {
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
