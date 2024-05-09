import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard';
import { CurrentUser, Roles } from 'src/shared/decorators';
import { UserRoles } from 'src/shared/schema/users';
import { User } from 'src/users/entities/CurrentUser.entity';

@UseGuards(AccessTokenGuard, RolesGuard)
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/me')
  myOrders(@CurrentUser() user: User) {
    return this.ordersService.myOrders(user);
  }

  @Post()
  create(@CurrentUser() user: User, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(user, createOrderDto);
  }

  @Roles(UserRoles.ADMIN)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
