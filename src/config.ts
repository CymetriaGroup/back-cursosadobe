import { Config } from "./models";
import dotenv from 'dotenv';

dotenv.config();

export const config: Config = {

    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    password: process.env.DB_PASSWORD || "skate12345",
    database: process.env.DB_DATABASE || "newcursosadobe",
    
}
