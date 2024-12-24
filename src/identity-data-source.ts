import { DataSource } from 'typeorm';
import { ApplicationUser } from './modules/account/account/entities/application-user.entity';
import { ApplicationRole } from './modules/account/account/entities/ApplicationRole';
import { ApplicationUserRole } from './modules/account/account/entities/application-user-role.entity';

export const AppDataSource = new DataSource({
  type: 'mysql', // e.g., 'mysql', 'postgres', etc.
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'storeidentity',
  entities: [ApplicationUser,ApplicationRole,ApplicationUserRole], // Add all your entities here
  migrations: ['src/database/identity/migrations/*.ts'], // Ensure this points to your migrations directory
  synchronize: true,
});
