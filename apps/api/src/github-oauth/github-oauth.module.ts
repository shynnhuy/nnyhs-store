import { Module } from '@nestjs/common';
import { GithubOauthService } from './github-oauth.service';
import { GithubOauthController } from './github-oauth.controller';
import { GithubStrategy } from 'src/shared/strategies/github.strategy';

@Module({
  controllers: [GithubOauthController],
  providers: [GithubOauthService, GithubStrategy],
})
export class GithubOauthModule {}
