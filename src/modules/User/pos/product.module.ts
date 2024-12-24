import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './product.controller';
import { Product } from './entities/product.entity';
import { ProductsService } from './product.service';
import { Repository } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'; // Import multer

@Module({
  imports: [TypeOrmModule.forFeature([Product],'store'), MulterModule.register({
    dest: 'src/uploads', // Specify the destination for uploaded files
  }),
  
],
  providers: [ProductsService ,Repository ],
  controllers: [ProductsController],
})
export class ProductsModule {}
