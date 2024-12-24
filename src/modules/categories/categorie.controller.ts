import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateCategDto } from './dto/create-categorie.dto';
import { UpdateCategoryDto } from './dto/update-categorie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Category } from './entities/categorie.entity';
import { Buffer } from 'buffer';
import { CategService } from './categ.service';

@Controller('api/categories')
export class CategController {
  constructor(private readonly service: CategService) {}
  @Get('list')
  async getProd(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('category') category: string,
  ): Promise<{ data: Category[]; rowCount: number }> {
          return this.service.getCategorys(page, pageSize, category);
  }
  @Post()
  async create(@Body() createDto: CreateCategDto): Promise<Category> {
   
            return await this.service.create(createDto);
  }
 
 



  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Category> {
            return await this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateCategoryDto): Promise<Category> {
   
      return await this.service.update(id, updateDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
      return await this.service.delete(id);
  }
}