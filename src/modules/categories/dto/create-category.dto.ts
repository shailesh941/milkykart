import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Category name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'electronics', description: 'URL slug' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ example: 'electronics', description: 'URL slug' })
  @IsOptional()
  @IsString()
  discription?: string;
}
