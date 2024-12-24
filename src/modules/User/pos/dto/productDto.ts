import { IsString, IsNumber, IsOptional, Length, IsBoolean } from 'class-validator';

export class ProductDto {
  @IsString()
  name: string;

  @IsString()
  ref: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsNumber()
  place_id: number;
 @IsBoolean()
  buttonAddToCartClicked : boolean;
  @IsString()
  @IsOptional()
  @Length(1, 5000)
  image?: string; // Base64 encoded image

  @IsString()
  category: string;

  @IsString()
  @IsOptional()
  qrcode?: string;
}
