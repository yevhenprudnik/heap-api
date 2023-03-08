import * as env from 'dotenv';
env.config({ path: '../.env' });

/* GENERAL */
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
/* DATABASE INFORMATION */
export const DB_CONNECTION = process.env.DB_CONNECTION;
/* Acsess and Refresh Key */
export const SECRET_KEY_ACCESS = process.env.JWT_ACCESS_SECRET_KEY;
export const SECRET_KEY_REFRESH = process.env.JWT_REFRESH_SECRET_KEY;
