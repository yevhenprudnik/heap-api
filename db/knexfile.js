import * as env from 'dotenv';
env.config({ path: '../.env' });

export default {
  development: {
    client: 'pg',
    connection:
      process.env.DB_CONNECTION
  },
};
