import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRoles } from 'src/shared/schema/users';
import { UserRepository } from 'src/shared/repository/user.repository';
import { sendEmail } from 'src/shared/utility/mail-handler';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private configService: ConfigService,
    @Inject(UserRepository) private readonly userDB: UserRepository,
    private readonly prisma: PrismaService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      if (createUserDto.role === UserRoles.ADMIN) {
        if (
          createUserDto.secretToken !==
          this.configService.get('adminSecretToken')
        ) {
          throw new Error('Not allowed to create admin');
        }
        createUserDto.isVerified = true;
      }

      const existsUser = await this.userDB.findOne({
        email: createUserDto.email,
      });

      if (existsUser) {
        throw new Error('User already exist');
      }

      const otp = Math.floor(Math.random() * 900000) + 100000;

      const otpExpiryTime = new Date();
      otpExpiryTime.setMinutes(otpExpiryTime.getMinutes() + 10);

      const newUser = await this.userDB.createAndSave({
        ...createUserDto,
        otp,
        otpExpiryTime,
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
      return {
        success: true,
        message:
          newUser.role === UserRoles.ADMIN
            ? 'Admin created successfully'
            : 'Please activate your account by verifying your email. We have sent you a wmail with the otp',
        result: { email: newUser.email },
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    const users = await this.userDB.findAll();
    return {
      result: users,
      success: true,
      message: 'Users fetched successfully',
    };
  }

  async findOne(id: string) {
    const user = await this.userDB.findById(id);
    return {
      result: user,
      success: true,
      message: 'User fetched successfully',
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: currentHashedRefreshToken },
    });
  }

  async getUserIfRefreshTokenMatches(userId: string, refreshToken: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isRefreshTokenMatching) throw new ForbiddenException('Access Denied');

    return user;
  }

  async setTwoFactorAuthenticationSecret(secret: string, id: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        twoFactorAuthenticationSecret: secret,
      },
    });
  }

  async turnOnTwoFactorAuthentication(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { enable2FA: true },
    });
  }

  async turnOffTwoFactorAuthentication(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { enable2FA: false },
    });
  }
}
