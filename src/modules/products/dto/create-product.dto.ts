import { 
  IsOptional, IsString, IsNumber, IsArray, IsBoolean, 
  IsEnum, Min, ValidateNested, IsUrl 
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

// Helper classes for nested validation
class DimensionsDto {
  @IsNumber() @Min(0) width: number;
  @IsNumber() @Min(0) height: number;
  @IsNumber() @Min(0) depth: number;
}

class MetaDto {
  @IsOptional() @IsString() barcode?: string;
  @IsOptional() @IsString() qrCode?: string;
}

export class CreateProductDto {
  @ApiProperty({ example: 'Essence Mascara Lash Princess' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A high-quality mascara for long lashes.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 9.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({ example: 10.5 })
  @IsOptional()
  @IsNumber()
  discountPercentage?: number;

  @ApiProperty({ example: 150 })
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 'RCH88S6W' })
  @IsString()
  sku: string;

  @ApiPropertyOptional({ example: 'Essence' })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: 'beauty' })
  @IsString()
  category: string; // This can be the Category ID or Name depending on your logic

  @ApiPropertyOptional({ type: DimensionsDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions?: DimensionsDto;

  @ApiPropertyOptional({ example: ['url1', 'url2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[];

  @ApiPropertyOptional({ example: 'thumbnail-url' })
  @IsOptional()
  @IsString()
  thumbnail?: string;

  @ApiPropertyOptional({ type: MetaDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => MetaDto)
  meta?: MetaDto;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  minimumOrderQuantity?: number;
}