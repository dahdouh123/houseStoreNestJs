import { IsOptional, IsString, Length } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';


@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

}
