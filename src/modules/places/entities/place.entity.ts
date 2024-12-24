import { IsOptional, IsString, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity('places')
export class Place {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  ref: string;

  @Column({ type: 'text' })
  maplocalisation: string;

  @Column()
  addresse: string;

  
  @Column()
  category: string;

 
}
