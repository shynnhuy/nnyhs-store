import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/shared/repository/user.repository';
import { UserSchema, Users } from 'src/shared/schema/users';
import { LocalStrategy } from 'src/shared/strategies/local.strategy';
import { AccessTokenStrategy } from 'src/shared/strategies/access-token.strategy';
import { RefreshTokenStrategy } from 'src/shared/strategies/refresh-token.strategy';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OTP, OTPSchema } from 'src/shared/schema/otps';
import { TwoFactorController } from './two-factor/two-factor.controller';
import { TwoFactorService } from './two-factor/two-factor.service';

@Module({
  controllers: [AuthController, TwoFactorController],
  providers: [
    ConfigModule,
    AuthService,
    UserRepository,
    UsersService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    TwoFactorService,
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
      {
        name: OTP.name,
        schema: OTPSchema,
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get('jwt.accessTokenSecret'),
        signOptions: {
          expiresIn: `${ConfigService.get('jwt.accessTokenExpirationTime')}s`,
        },
      }),
    }),
  ],
  exports: [
    AuthService,
    UsersService,
    JwtModule,
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
      {
        name: OTP.name,
        schema: OTPSchema,
      },
    ]),
  ],
})
export class AuthModule {}
