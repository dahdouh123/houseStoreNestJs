import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { OrderProducts } from './entities/order-products.entity';
import { OrderStatus } from './entities/order-status.enum';
import { UserInfos } from './entities/user-infos.entity';


@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'decimal' })
    orderTotal: number;

    @Column()
    numberOfProducts: number;

    @OneToMany(() => OrderProducts, (product) => product.order, { cascade: true })
    includedProducts: OrderProducts[];

    @Column({ type: 'enum', enum: OrderStatus })
    orderStatus: OrderStatus;



     // Change to ManyToOne to reflect that each order has one user info
     @ManyToOne(() => UserInfos, (user) => user.orders, { cascade: true })
     userInfos: UserInfos; // This will now hold a single UserInfos instance
 
}