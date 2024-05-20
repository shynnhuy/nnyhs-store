import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: process.env.PORT || 3100,
  appPrefix: process.env.APP_PREFIX || '/api/v1',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
}));
