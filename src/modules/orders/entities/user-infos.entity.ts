import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from '../order.entity';


@Entity('user_infos')
export class UserInfos {
    @PrimaryGeneratedColumn('uuid')
    userId?: string;

    @Column()
    userName: string;

    @Column()
    phone: string;

    @Column()
    adresse: string;

    @Column({ nullable: true })
    state?: string;

    @Column({ nullable: true })
    postalcode?: string;

  // Change to OneToMany to reflect that a user can have multiple orders
  @OneToMany(() => Order, (order) => order.userInfos)
  orders: Order[]; // This will now hold an array of Order instances
}