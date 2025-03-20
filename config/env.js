import {config} from 'dotenv';


config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const {PORT, NODE_ENV , DB_URI , ARCJET_KEY , ARCJET_ENV,JWT_SECRET, JWT_EXPIRES_IN , QSTASH_TOKEN, QSTASH_URL, SERVER_URL ,EMAIL_PASSWORD} = process.env;