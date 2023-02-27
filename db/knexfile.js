import { DB_CONNECTION } from '../environment.js';

export default {
  development: {
    client: 'pg',
    connection: DB_CONNECTION,
  },
};
