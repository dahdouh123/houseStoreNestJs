import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'; // Import multer
import { Category } from './entities/categorie.entity';
import { CategService } from './categ.service';
import { CategController } from './categorie.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category],'store'), MulterModule.register({
    dest: 'src/uploads', // Specify the destination for uploaded files
  }),
  
],
  providers: [CategService ,Repository ],
  controllers: [CategController],
})
export class CategModule {}
