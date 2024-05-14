import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { LocalGuard } from 'src/shared/guards/local.guard';
import { RefreshTokenGuard } from 'src/shared/guards/refresh-token.guard';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from './types/request-with-user';
import { GoogleOauthGuard } from 'src/shared/guards/google.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: RequestWithUser) {
    return this.authService.login(req);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('/verify-email/:otp/:email')
  async verifyEmail(@Param('otp') otp: string, @Param('email') email: string) {
    return this.authService.verifyEmail(otp, email);
  }

  @Get('/resend-otp/:email')
  async resendOtp(@Param('email') email: string) {
    return this.authService.resendOtp(email);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  @Delete('/logout')
  async logout(@Req() request: RequestWithUser) {
    return this.authService.logout(request);
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  refreshToken(@Req() req: RequestWithUser) {
    return this.authService.refreshTokens(req);
  }

  @Get('/google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('/google-redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req) {
    return this.authService.login(req);
  }
}
