import * as env from 'dotenv';
env.config({ path: '../.env' });

/* GENERAL */
export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const API_URL = process.env.API_URL;
/* DATABASE INFO */
export const DB_CONNECTION = process.env.DB_CONNECTION;
/* JWT */
export const JWT_SECRET = process.env.JWT_SECRET;
