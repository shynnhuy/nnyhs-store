import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { AuthProvider } from '@prisma/client';
import { Profile, Strategy } from 'passport-github';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      clientID: configService.get<string>('github.clientId'),
      clientSecret: configService.get<string>('github.clientSecret'),
      callbackURL: configService.get<string>('github.callbackUrl'),
      scope: ['public_profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { displayName, emails, photos } = profile;
    const user = {
      name: displayName,
      email: emails[0].value,
      picture: photos[0].value,
    };

    const _user = await this.prisma.user.upsert({
      where: { email: user.email },
      create: {
        name: user.name,
        email: user.email,
        otp: '',
        otpExpiryTime: new Date(),
        password: 'random_password',
        isVerified: true,
        provider: [AuthProvider.GITHUB],
      },
      update: {
        email: user.email,
        isVerified: true,
        provider: [AuthProvider.GITHUB],
      },
    });

    return _user;
  }
}
