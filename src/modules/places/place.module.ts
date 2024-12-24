import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'; // Import multer
import { Place } from './entities/place.entity';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Place],'store'), MulterModule.register({
    dest: 'src/uploads', // Specify the destination for uploaded files
  }),
  
],
  providers: [PlacesService ,Repository ],
  controllers: [PlacesController],
})
export class PlaceModule {}
