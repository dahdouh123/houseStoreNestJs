import { IsString, IsNumber, IsOptional, Length, isString } from 'class-validator';

export class PlaceDto {
  @IsString()
  name: string;

  @IsString()
  ref: string;


  @IsString()
  mapLocalisation: number;
  
  @IsString()
  addresse: string;
 

  @IsString()
  category: string;

 
}
