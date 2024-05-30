import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { RequestWithUser } from 'src/auth/types/request-with-user';
import { GoogleOauthGuard } from 'src/shared/guards/google.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    return HttpStatus.OK;
  }

  @Get('callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: RequestWithUser) {
    const { user } = req;
    if (user.enable2FA) {
      console.log('here');
      // TODO: SEND OTP
      // const otpResponse = await this.termiiService.sendOtp(
      //   req.user.phoneNumber,
      // );
      // data = { otpResponse };
    } else {
      const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
        user.id,
      );
      const { cookie: refreshTokenCookie, token: refreshToken } =
        this.authService.getCookieWithJwtRefreshToken(user.id);

      await this.userService.updateRefreshToken(user.id, refreshToken);

      return req.res
        .setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie])
        .redirect(`${this.configService.get('app.clientUrl')}`);
    }
  }

  // @Get('callback')
  // @UseGuards(GoogleOauthGuard)
  // async googleAuthRedirect(@Req() req: RequestWithUser, @Res() res) {
  //   let data: any = '';
  //   if (req.user.name) {
  //     if (req.user.enable2FA || !req.user.isVerified) {
  //       // TODO: SEND OTP
  //       // const otpResponse = await this.termiiService.sendOtp(
  //       //   req.user.phoneNumber,
  //       // );
  //       // data = { otpResponse };
  //     } else {
  //       const authToken = this.authService.login(req);
  //       data = { authToken };
  //     }
  //     data = Buffer.from(JSON.stringify(data)).toString('base64');
  //     res.redirect(
  //       `${this.configService.get('app.clientUrl')}/auth/social/success/${data}`,
  //     );
  //   } else {
  //     data = Buffer.from(JSON.stringify(req.user)).toString('base64');
  //     res.redirect(
  //       `${this.configService.get('app.clientUrl')}/auth/register/${data}`,
  //     );
  //   }
  // }
}
