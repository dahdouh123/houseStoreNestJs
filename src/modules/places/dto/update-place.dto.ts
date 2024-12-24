import { IsString, IsNumber, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { isArrayBuffer } from 'util/types';

export class UpdatePlaceDto {
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
  @IsOptional()
  mapLocalisation: string;

  @IsString()
  addresse: string;

  @IsString()
  @IsNotEmpty()
  category: string;

 
}
