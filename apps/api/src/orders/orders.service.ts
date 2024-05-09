import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/entities/CurrentUser.entity';
import { Prisma } from '@prisma/client';

const includeOrders: Prisma.OrderInclude = {
  customer: {
    select: {
      id: true,
      email: true,
      name: true,
    },
  },
  orderItems: {
    select: {
      id: true,
      quantity: true,
      product: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  },
};

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async myOrders(user: User) {
    try {
      const result = await this.prisma.order.findAll({
        where: {
          customerId: user._id.toString(),
        },
        pagination: {
          limit: 10,
          page: 1,
        },
        include: includeOrders,
      });
      return { result };
    } catch (error) {
      throw error;
    }
  }
  async create(user: any, { orderItems, ...createOrderDto }: CreateOrderDto) {
    const result = await this.prisma.order.create({
      data: {
        ...createOrderDto,
        customer: {
          connect: {
            id: user.id,
          },
        },
        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
      },
    });
    return { result };
  }

  async findAll() {
    const result = await this.prisma.order.findMany({
      include: includeOrders,
    });
    return { result };
  }

  async findOne(id: string) {
    try {
      const order = await this.prisma.order.findById(id, {
        include: includeOrders,
      });
      console.log('order', order);
      return { result: order };
    } catch (error) {
      throw error;
    }
  }

  update(id: number, _: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
