import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { join, resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });
dotenv.config({ path: resolve(process.cwd(), 'apps/edge-api/.env') });

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL || undefined,
    host: process.env.DATABASE_URL ? undefined : process.env.DB_HOST || 'localhost',
    port: process.env.DATABASE_URL ? undefined : Number(process.env.DB_PORT) || 5432,
    username: process.env.DATABASE_URL ? undefined : process.env.DB_USER || 'navai',
    password: process.env.DATABASE_URL ? undefined : process.env.DB_PASS || 'navai',
    database: process.env.DATABASE_URL ? undefined : process.env.DB_NAME || 'navai',
    // Forcer SSL pour Neon / Render
    ssl: { rejectUnauthorized: false },
    entities: [join(__dirname, '/**/*.entity.{ts,js}')],
    migrations: [join(__dirname, '/migrations/*.{ts,js}')],
    synchronize: false,
    logging: process.env.NODE_ENV !== 'production',
});
