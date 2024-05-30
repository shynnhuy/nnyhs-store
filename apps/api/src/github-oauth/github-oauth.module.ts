import { Module } from '@nestjs/common';
import { GithubOauthController } from './github-oauth.controller';
import { GithubStrategy } from 'src/shared/strategies/github.strategy';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [GithubOauthController],
  providers: [GithubStrategy, AuthService],
  imports: [AuthModule],
})
export class GithubOauthModule {}
