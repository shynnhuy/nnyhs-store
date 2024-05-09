import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/shared/decorators';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { UsersService } from 'src/users/users.service';
import { TwoFactorAuthenticationCodeDto } from './dto/two-factor.dto';
import { TwoFactorService } from './two-factor.service';
import { AuthService } from '../auth.service';
import { RequestWithUser } from '../types/request-with-user';
import { Response } from 'express';

@UseGuards(AccessTokenGuard)
@Controller('2fa')
@ApiTags('authentication-2fa')
export class TwoFactorController {
  constructor(
    private readonly twoFactorService: TwoFactorService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('generate')
  async generate2faSecret(
    @CurrentUser() user: User,
    @Res() response: Response,
  ) {
    const { otpAuthUrl } =
      await this.twoFactorService.generateTwoFactorAuthenticationSecret(user);

    response.setHeader('content-type', 'image/png');

    return this.twoFactorService.pipeQrCodeStream(response, otpAuthUrl);
  }

  @HttpCode(200)
  @Post('turn-on')
  async turnOn2fa(
    @CurrentUser() user: User,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto,
  ) {
    const isCodeValid =
      this.twoFactorService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        user,
      );
    if (!isCodeValid) throw new UnauthorizedException('Invalid 2FA code');

    await this.usersService.turnOnTwoFactorAuthentication(user.id);
  }

  @HttpCode(200)
  @Post('turn-off')
  async turnOff2fa(
    @CurrentUser() user: User,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto,
  ) {
    const isCodeValid =
      this.twoFactorService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        user,
      );
    if (!isCodeValid) throw new UnauthorizedException('Invalid 2FA code');

    await this.usersService.turnOffTwoFactorAuthentication(user.id);
  }

  @HttpCode(200)
  @Post('authenticate')
  async authenticate(
    @Req() request: RequestWithUser,
    @CurrentUser() user: User,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto,
  ) {
    const isCodeValid =
      this.twoFactorService.isTwoFactorAuthenticationCodeValid(
        twoFactorAuthenticationCode,
        user,
      );

    if (!isCodeValid) throw new UnauthorizedException('Invalid 2FA code');

    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(
      user.id,
      true,
    );
    request.res.setHeader('Set-Cookie', [accessTokenCookie]);

    return { result: request.user };
  }
}
