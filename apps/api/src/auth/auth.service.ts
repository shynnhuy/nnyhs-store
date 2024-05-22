import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { PrismaService } from 'src/prisma/prisma.service';
import { OTP } from 'src/shared/schema/otps';
import { UserRoles } from 'src/shared/schema/users';
import { sendEmail } from 'src/shared/utility/mail-handler';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RequestWithUser } from './types/request-with-user';
import { TokenPayload } from './types/token-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(OTP.name) private readonly otpModel: Model<OTP>,
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(loginUser: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUser.email },
    });

    if (!user)
      throw new NotFoundException('User with this email does not exist');

    await this.verifyPassword(loginUser.password, user.password);

    const { password: _, ...restUser } = user;

    return restUser;
  }

  async login(request: RequestWithUser) {
    const { user } = request;

    const tokens = await this.getTokens(user.id, user.email);

    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);

    request.res.setHeader('Set-Cookie', [
      `Authentication=${tokens.accessToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
        'jwt.accessTokenExpirationTime',
      )}`,
      `Refresh=${tokens.refreshToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
        'jwt.refreshTokenExpirationTime',
      )}`,
    ]);

    return user.enable2FA
      ? {
          success: true,
          message: 'Login successfully',
        }
      : {
          success: true,
          result: { tokens, user },
          message: 'Login successfully',
        };
  }

  async register(registerUser: RegisterDto) {
    try {
      if (registerUser.role === UserRoles.ADMIN) {
        if (
          registerUser.secretToken !==
          this.configService.get('adminSecretToken')
        ) {
          throw new Error('Not allowed to create admin');
        }
        registerUser.isVerified = true;
      }

      const existsUser = await this.prisma.user.findUnique({
        where: { email: registerUser.email },
      });

      if (existsUser) {
        throw new ConflictException('User already exist');
      }

      const otp = Math.floor(Math.random() * 900000) + 100000;

      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);

      const hashedPassword = await bcrypt.hash(registerUser.password, 10);

      const document = await this.otpModel.create({
        otp: otp.toString(),
        email: registerUser.email,
      });

      await document.save();

      const newUser = await this.prisma.user.create({
        data: {
          ...registerUser,
          password: hashedPassword,
          otp: otp.toString(),
          otpExpiryTime,
        },
      });

      if (newUser.role !== UserRoles.ADMIN) {
        sendEmail(
          newUser.email,
          this.configService.get('emailService.emailTemplates.verifyEmail'),
          'Email verification - NnyhS Store',
          {
            customerName: newUser.name,
            customerEmail: newUser.email,
            otp,
          },
        );
      }

      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRefreshToken(newUser.id, tokens.refreshToken);

      return {
        success: true,
        message:
          newUser.role === UserRoles.ADMIN
            ? 'Admin created successfully'
            : 'Please activate your account by verifying your email. We have sent you a email with the otp',
        result: tokens,
      };
    } catch (error) {
      throw error;
    }
  }

  async logout(request: RequestWithUser) {
    await this.prisma.user.update({
      where: { id: request.user.id },
      data: { refreshToken: '' },
    });

    request.res.setHeader('Set-Cookie', this.getCookiesForLogOut());
  }

  async verifyEmail(otp: string, email: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.otp !== otp) {
        throw new BadRequestException('Invalid otp');
      }

      if (user.otpExpiryTime < new Date()) {
        throw new Error('Otp expired');
      }

      await this.prisma.user.update({
        where: { email },
        data: { isVerified: true, otp: '', otpExpiryTime: null },
      });

      return {
        success: true,
        message: 'Email verified successfully',
      };
    } catch (error) {
      throw error;
    }
  }

  async resendOtp(email: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.isVerified) {
        throw new BadRequestException('User is already verified');
      }

      const otp = Math.floor(Math.random() * 900000) + 100000;
      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);

      await this.prisma.user.update({
        where: { email },
        data: { otp: otp.toString(), otpExpiryTime },
      });

      sendEmail(
        user.email,
        this.configService.get('emailService.emailTemplates.verifyEmail'),
        'Email verification - NnyhS Store',
        {
          customerName: user.name,
          customerEmail: user.email,
          otp,
        },
      );

      return {
        success: true,
        message: 'Otp sent successfully',
        result: { email: user.email },
      };
    } catch (error) {
      throw error;
    }
  }

  async refreshTokens(req: RequestWithUser) {
    const user = req.user;

    const tokens = await this.getTokens(user.id, user.email);

    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      success: true,
      message: 'Refresh token generated successfully',
      result: tokens,
    };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async getTokens(
    userId: string,
    email: string,
    isSecondFactorAuthenticated = false,
  ) {
    const payload: TokenPayload = {
      userId,
      email,
      isSecondFactorAuthenticated,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.accessTokenSecret'),
        expiresIn: `${this.configService.get('jwt.accessTokenExpirationTime')}s`,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('jwt.refreshTokenSecret'),
        expiresIn: `${this.configService.get('jwt.refreshTokenExpirationTime')}s`,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async hashData(data: string) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(data, salt);
    return password;
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isAuthenticated = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isAuthenticated) {
      throw new BadRequestException('Invalid email or password');
    }
  }

  public getCookieWithJwtAccessToken(
    userId: string,
    isSecondFactorAuthenticated = false,
  ) {
    const payload: TokenPayload = { userId, isSecondFactorAuthenticated };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.accessTokenSecret'),
      expiresIn: `${this.configService.get('jwt.accessTokenExpirationTime')}s`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'jwt.accessTokenExpirationTime',
    )}`;
  }

  public getCookieWithJwtRefreshToken(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refreshTokenSecret'),
      expiresIn: `${this.configService.get('jwt.refreshTokenExpirationTime')}s`,
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'jwt.refreshTokenExpirationTime',
    )}`;
    return {
      cookie,
      token,
    };
  }

  public getCookiesForLogOut() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }

  getCookieTokens(userId: string, isSecondFactorAuthenticated = false) {
    const payload: TokenPayload = { userId, isSecondFactorAuthenticated };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.accessTokenSecret'),
      expiresIn: `${this.configService.get('jwt.accessTokenExpirationTime')}s`,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('jwt.refreshTokenSecret'),
      expiresIn: `${this.configService.get('jwt.refreshTokenExpirationTime')}s`,
    });

    return { accessToken, refreshToken };
  }
}
