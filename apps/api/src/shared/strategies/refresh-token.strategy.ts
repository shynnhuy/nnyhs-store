import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from 'src/auth/types/token-payload';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.['Refresh'],
      ]),
      secretOrKey: configService.get('jwt.refreshTokenSecret'),
      passReqToCallback: true,
    });
  }
  validate(req: Request, payload: TokenPayload) {
    const refreshToken = req.cookies?.['Refresh'];
    return this.userService.getUserIfRefreshTokenMatches(
      payload.userId,
      refreshToken,
    );
  }
}
