import { IsString, IsNumber, IsOptional, Length, IsBoolean } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  id: string;
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  ref?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  place_id?: number;

  @IsString()
  @IsOptional()
  image?: string; // Base64 encoded image string

  @IsString()
  @IsOptional()
  category?: string;
 @IsBoolean()
  buttonAddToCartClicked : boolean;
  @IsString()
  @IsOptional()
  qrcode?: string;
}
