import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
const prismaMock = {
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    function mockUserModel(dto: any) {
      this.data = dto;
      this.save = () => {
        return this.data;
      };
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        ConfigService,
        {
          provide: UsersService,
          useValue: {},
        },
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: getModelToken('OTP'),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
