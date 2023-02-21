export const postSchema = {
  schema: {
    description:
      'This is an example description for schema. Description be used mostly for swagger',
    body: {
      type: 'object',
      required: ['input'],
      properties: {
        input: {
          type: 'string',
        },
      },
    },
    response: {
      '2xx': {
        type: 'string',
      },
    },
  },
};
