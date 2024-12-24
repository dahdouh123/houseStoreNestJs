import { IsOptional, IsString, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  ref: string;

  @Column({ type: 'text' })
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  quantity: number;

  @Column()
  place_id: number;
  @Column()
  buttonAddToCartClicked : boolean;
  @Column({ type: 'text'})  // Use 'bytea' for storing binary data (Buffer in this case)
  image?: string;
  
  @Column()
  category: string;

  @Column({ type: 'text'  })
  qrcode?: string;
}
