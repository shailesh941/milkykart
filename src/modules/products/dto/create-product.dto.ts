import { IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Phone', description: 'Product name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Smartphone with 128GB storage', description: 'Product description' })
  @IsString()
  description: string;

  @ApiProperty({ example: 799, description: 'Product price' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 50, description: 'Stock quantity' })
  @IsNumber()
  stock: number;

  @ApiPropertyOptional({ example: 'uuid-category', description: 'Category ID' })
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({ example: 'https://...', description: 'Image URL' })
  @IsOptional()
  @IsString()
  image?: string;
}
