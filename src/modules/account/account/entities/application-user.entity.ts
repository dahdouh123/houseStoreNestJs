import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApplicationUserRole } from './application-user-role.entity'; // Import the ApplicationUserRole entity
import { Guid } from 'guid-typescript';

@Entity('application_user')
export class ApplicationUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ default: true })
  isActive: boolean;
  @Column()
  passwordHash: string; // Store the hashed password
  @Column({ nullable: true })
  isShowPhoneNumberInOdoo: boolean;
  @Column()
  phoneNumber: string;
  @Column()
  adresse: string;

  

  
 
  @OneToMany(() => ApplicationUserRole, (userRole) => userRole.user)
  userRoles: ApplicationUserRole[];




}
