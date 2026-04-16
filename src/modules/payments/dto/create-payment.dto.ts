import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-order', description: 'Associated order ID' })
  @IsUUID()
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ example: 'card', description: 'Payment method' })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({ example: 'paid', description: 'Payment status' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: 120.0, description: 'Transaction amount' })
  @IsNumber()
  @Min(0)
  amount: number;
}
