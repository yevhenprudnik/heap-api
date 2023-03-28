import * as env from 'dotenv';
env.config({ path: '../.env' });

/* GENERAL */
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
/* DATABASE INFORMATION */
export const DB_CONNECTION = process.env.DB_CONNECTION;
/* Access and Refresh Key */
export const SECRET_KEY_ACCESS = process.env.SECRET_KEY_ACCESS;
export const SECRET_KEY_REFRESH = process.env.SECRET_KEY_REFRESH;

/* Cookie Secret Key */
export const SECRET_KEY_COOKIE = process.env.SECRET_KEY_COOKIE;
