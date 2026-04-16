import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

class CartItemDto {
  @ApiProperty({ example: 'uuid-product', description: 'Product ID' })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 2, description: 'Product quantity' })
  @IsNotEmpty()
  quantity: number;
}

export class CreateCartDto {
  @ApiProperty({ example: 'uuid-user', description: 'Owner user ID' })
  @IsUUID()
  userId: string;

  @ApiProperty({ type: [CartItemDto], description: 'Cart line items' })
  @IsArray()
  items: CartItemDto[];
}
