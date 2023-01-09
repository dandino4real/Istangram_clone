
import dotenv from 'dotenv';
dotenv.config();

export const MONGODB_URL = process.env.MONGODB_URL! ;
export const PORT = process.env.PORT 

export const APP_SECRET = process.env.APP_SECRET!;


export const GMAIL_USER = process.env.GMAIL_USER
export const GMAIL_PASS = process.env.GMAIL_PASS
export const FromAdminMail = process.env.FromAdminMail
export const userSubject = process.env.userSubject