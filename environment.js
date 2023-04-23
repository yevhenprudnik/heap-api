import * as env from 'dotenv';
env.config({ path: '../.env' });

/* GENERAL */
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
/* DATABASE INFORMATION */
export const DB_CONNECTION = process.env.DB_CONNECTION;
/* Access and Refresh Key */
export const JWT_SECRET = process.env.JWT_SECRET;
