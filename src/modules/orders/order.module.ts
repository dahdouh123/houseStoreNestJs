import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer'; // Import multer
import { OrdersService } from './entities/order.service';
import { OrdersController } from './orders.controller';
import { Order } from './order.entity';
import { OrderProducts } from './entities/order-products.entity';
import { UserInfos } from './entities/user-infos.entity';
import { Product } from 'modules/User/pos/entities/product.entity';
import { ProductsService } from 'modules/User/pos/product.service';


@Module({
  imports: [TypeOrmModule.forFeature([Order,OrderProducts,UserInfos , Product],'store'), MulterModule.register({
    dest: 'src/uploads', // Specify the destination for uploaded files
  }),
  
],
  providers: [OrdersService ,Repository , ProductsService  ],
  controllers: [OrdersController],
})
export class OrderModule {}
