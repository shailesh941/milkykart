import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

class OrderItemDto {
  @ApiProperty({ example: 'uuid-product', description: 'Product ID' })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 1, description: 'Product quantity' })
  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'uuid-user', description: 'User ID making order' })
  @IsUUID()
  userId: string;

  @ApiProperty({ type: [OrderItemDto], description: 'Order items' })
  @IsArray()
  items: OrderItemDto[];

  @ApiProperty({ example: 149.99, description: 'Total amount' })
  @IsNumber()
  totalAmount: number;
}
