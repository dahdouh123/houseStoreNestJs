import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Place } from './entities/place.entity';
import { Buffer } from 'buffer';
import { PlacesService } from './places.service';

@Controller('api/places')
export class PlacesController {
  constructor(private readonly service: PlacesService) {}
  @Get('list')
  async getProd(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('category') category: string,
  ): Promise<{ data: Place[]; rowCount: number }> {
          return this.service.getPlaces(page, pageSize, category);
  }
  @Post()
  async create(@Body() createDto: CreatePlaceDto): Promise<Place> {
   
            return await this.service.create(createDto);
  }
 
 



  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Place> {
            return await this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdatePlaceDto): Promise<Place> {
   
      return await this.service.update(id, updateDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
      return await this.service.delete(id);
  }
}