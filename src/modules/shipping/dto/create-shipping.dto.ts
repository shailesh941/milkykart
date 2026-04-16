import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateShippingDto {
  @ApiProperty({ example: 'uuid-order', description: 'Order ID' })
  @IsUUID()
  orderId: string;

  @ApiProperty({ example: 'FedEx', description: 'Courier service' })
  @IsString()
  @IsNotEmpty()
  carrier: string;

  @ApiProperty({ example: '123 Main St, City, Country', description: 'Shipping address' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'pending', description: 'Shipping status' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
