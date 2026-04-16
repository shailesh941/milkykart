import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ example: 'uuid-product', description: 'Product ID' })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 150, description: 'Stock quantity' })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
