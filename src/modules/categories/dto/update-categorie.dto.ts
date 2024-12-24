import { IsString, IsNumber, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { isArrayBuffer } from 'util/types';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;

 
 
}
