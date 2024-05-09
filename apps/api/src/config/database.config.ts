import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('db', () => ({
  database_url: process.env.DATABASE_URL,
}));
