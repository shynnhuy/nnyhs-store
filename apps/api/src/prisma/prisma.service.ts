import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { findAll, findById, logger, pagination } from 'src/lib';

function extendPrismaClient() {
  const prisma = new PrismaClient();
  return prisma
    .$extends(pagination({ pages: { limit: 10, includePageCount: true } }))
    .$extends(logger)
    .$extends(findById)
    .$extends(findAll);
}
const ExtendedPrismaClient = class {
  constructor() {
    return extendPrismaClient();
  }
} as new () => ReturnType<typeof extendPrismaClient>;

@Injectable()
export class PrismaService
  extends ExtendedPrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
