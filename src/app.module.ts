import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './database/seeds/seed.service';
import { ApplicationRole } from './modules/account/account/entities/ApplicationRole';
import { ApplicationUser } from './modules/account/account/entities/application-user.entity';
import { ApplicationUserRole } from './modules/account/account/entities/application-user-role.entity';
import { AuthModule } from './modules/account/account/auth.module';
import { Product } from 'modules/User/pos/entities/product.entity';
import { ProductsModule } from 'modules/User/pos/product.module';
import { Place } from 'modules/places/entities/place.entity';
import { Category } from 'modules/categories/entities/categorie.entity';
import { PlaceModule } from 'modules/places/place.module';
import { CategModule } from 'modules/categories/categorie.module';
import { Order } from 'modules/orders/order.entity';
import { OrderModule } from 'modules/orders/order.module';
import { OrderProducts } from 'modules/orders/entities/order-products.entity';
import { UserInfos } from 'modules/orders/entities/user-infos.entity';

@Module({
  imports: [
    // First database (Production)
    TypeOrmModule.forRoot({
      name: 'store',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'store',
      entities: [Product,Place,Category,Order,OrderProducts,UserInfos], // Production DB entities
      synchronize: false, // Set to false in production
    }),
    
    // Second database (Identity)
    TypeOrmModule.forRoot({
      name: 'storeidentity',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'storeidentity',
      entities: [ ApplicationRole, ApplicationUser, ApplicationUserRole], // Identity DB entities
      synchronize: false, // Set to false in production
    }),
    
    // Register repositories with the connection name for the second database
    TypeOrmModule.forFeature([ApplicationRole, ApplicationUser, ApplicationUserRole], 'storeidentity'),
    
    // Your other modules
    ProductsModule,AuthModule,PlaceModule,CategModule,OrderModule
  ],
  
  providers: [SeedService],
})
export class AppModule {}
