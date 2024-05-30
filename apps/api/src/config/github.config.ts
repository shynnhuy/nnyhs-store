import { registerAs } from '@nestjs/config';

export const githubConfig = registerAs('github', () => ({
  clientId: process.env.GITHUB_CLIENT_ID ?? 'Ov23lixlM9ohHKpyKi8U',
  clientSecret:
    process.env.GITHUB_CLIENT_SECRET ??
    'aeb301fa468cfed1438fae02b3e3ad7d8b9f0560',
  callbackUrl: `${process.env.APP_URL}/api/v1/auth/github/callback`,
}));
