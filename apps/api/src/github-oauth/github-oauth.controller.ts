import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RequestWithUser } from 'src/auth/types/request-with-user';
import { GithubOauthGuard } from 'src/shared/guards/github.guard';

@Controller('auth/github')
export class GithubOauthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async login() {
    return HttpStatus.OK;
  }

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  async authCallback(@Req() req: RequestWithUser) {
    return this.authService.oauthLogin(req);
  }
}
