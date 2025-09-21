import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { resolve, join } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

const dataSource = new DataSource({
    type: 'postgres',

    // Supabase via DATABASE_URL sinon fallback local (Docker) si tu le remets un jour
    url: process.env.DATABASE_URL || undefined,
    host: process.env.DATABASE_URL ? undefined : process.env.DB_HOST || 'localhost',
    port: process.env.DATABASE_URL ? undefined : Number(process.env.DB_PORT) || 5432,
    username: process.env.DATABASE_URL ? undefined : process.env.DB_USER || 'navai',
    password: process.env.DATABASE_URL ? undefined : process.env.DB_PASS || 'navai',
    database: process.env.DATABASE_URL ? undefined : process.env.DB_NAME || 'navai',

    ssl: process.env.DATABASE_SSL === 'true'
        ? { rejectUnauthorized: false }
        : false,

    entities: [join(__dirname, '/**/*.entity.{ts,js}')],
    migrations: [join(__dirname, '/migrations/*.{ts,js}')],
    synchronize: false,
    logging: process.env.NODE_ENV !== 'production',
});

export default dataSource;
