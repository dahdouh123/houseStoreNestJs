import { IsString, IsNumber, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { isArrayBuffer } from 'util/types';

export class CreatePlaceDto {
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
  maplocalisation: string;

  @IsString()
  addresse: string;

  @IsString()
  @IsNotEmpty()
  category: string;

 
}
