import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from '../order.entity';

@Entity('order_products')
export class OrderProducts {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productId: string;

    @Column({ type: 'decimal' })
    price: number;

    @Column()
    name: string;

    @Column()
    qte: number;

    @Column({ type: 'decimal' })
    total: number;

    @ManyToOne(() => Order, (order) => order.includedProducts)
    order: Order;

  
}