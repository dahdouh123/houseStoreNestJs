import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from './entities/product.entity';
import { Buffer } from 'buffer';
import { ProductDto } from './dto/productDto';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}
  @Get('list')
  async getProd(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
    @Query('category') category: string,
  ): Promise<{ data: ProductDto[]; rowCount: number }> {
          return this.service.getProductions(page, pageSize, category);
  }
  @Post()
  async create(@Body() createDto: CreateProductDto): Promise<Product> {
   
            return await this.service.create(createDto);
  }
 
  private decodeBase64ToBuffer(base64String: string): Buffer {
    return Buffer.from(base64String, 'base64');
  }
 



  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
            return await this.service.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateProductDto): Promise<Product> {
   
      return await this.service.update(id, updateDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number): Promise<void> {
      return await this.service.delete(id);
  }
}