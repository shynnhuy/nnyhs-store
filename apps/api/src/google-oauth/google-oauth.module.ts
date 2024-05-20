import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { GoogleOauthController } from './google-oauth.controller';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from 'src/shared/strategies/google.strategy';

@Module({
  controllers: [GoogleOauthController],
  providers: [ConfigModule, AuthService, GoogleStrategy],
  imports: [AuthModule, UsersModule, JwtModule],
})
export class GoogleOauthModule {}
