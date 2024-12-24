import { IsString, IsNumber, IsNotEmpty, IsOptional, Length, IsBoolean } from 'class-validator';
import { isArrayBuffer } from 'util/types';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ref: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  place_id: number;
  @IsString()
  @IsOptional()
  image?: string; // Base64 encoded image string

  @IsString()
  @IsNotEmpty()
  category: string;
  @IsBoolean()
  buttonAddToCartClicked : boolean;
  
  @IsString()
  @IsOptional() // Optional since it might be generated dynamically
  qrcode?: string;
}
