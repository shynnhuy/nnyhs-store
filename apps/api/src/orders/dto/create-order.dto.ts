import { IsString } from 'class-validator';

export class OrderItemsDto {
  @IsString()
  productId: string;

  @IsString()
  quantity: number;
}

export class CreateOrderDto {
  @IsString()
  status: string;

  @IsString()
  totalAmount: number;

  orderItems: OrderItemsDto[];
}
