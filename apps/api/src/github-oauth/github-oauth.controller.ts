import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { GithubOauthService } from './github-oauth.service';
import { GithubOauthGuard } from 'src/shared/guards/github.guard';

@Controller('auth/github')
export class GithubOauthController {
  constructor(private readonly githubOauthService: GithubOauthService) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async login() {
    return HttpStatus.OK;
  }

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  async authCallback(@Req() req) {
    const user = req.user;
    console.log('user', user);
    return { result: user };
  }
}
