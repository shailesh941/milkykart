import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 'uuid-product', description: 'Target product ID' })
  @IsUUID()
  productId: string;

  @ApiProperty({ example: 'uuid-user', description: 'Reviewer user ID' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 5, description: 'Rating (1-5)' })
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @ApiProperty({ example: 'Excellent product', description: 'Review comment' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
