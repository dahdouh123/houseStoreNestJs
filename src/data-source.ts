import { DataSource } from 'typeorm';

import { Product } from './modules/User/pos/entities/product.entity';
import { Place } from './modules/places/entities/place.entity';
import { Category } from './modules/categories/entities/categorie.entity';
import { Order } from './modules/orders/order.entity';
import { OrderProducts } from './modules/orders/entities/order-products.entity';
import { UserInfos } from './modules/orders/entities/user-infos.entity';

export const AppDataSource = new DataSource({
  type: 'mysql', // e.g., 'mysql', 'postgres', etc.
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'store',
  entities: [Product,Place,Category,Order,OrderProducts,UserInfos], // Add all your entities here
  migrations: ['src/database/migrations/*.ts'], // Ensure this points to your migrations directory
  synchronize: true,
});
