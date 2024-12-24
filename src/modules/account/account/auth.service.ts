// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationUser } from './entities/application-user.entity';
import { LoginDto } from './dto/login.dto';
import { Guid } from 'guid-typescript';
import { identity } from 'rxjs';
import { Identity } from './dto/identity.dto';
import { ApplicationRole } from './entities/ApplicationRole';
import { CreateUserDto } from './dto/create-user.dto';
import { ApplicationUserRole } from './entities/application-user-role.entity';
import * as uuid from "uuid";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(ApplicationUser, 'storeidentity') 
    private userRepository: Repository<ApplicationUser>,
    @InjectRepository(ApplicationRole, 'storeidentity') 
    private rolesRepository: Repository<ApplicationRole>,
      @InjectRepository(ApplicationUserRole, 'storeidentity')
            private readonly appUsersRolesRepository: Repository<ApplicationUserRole>,
   
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log("email and password",email,password);
    // Fetch the user without affiliation
    const userwithout = await this.userRepository.findOne({ where: { email } });
    
    // Fetch the user with affiliation and userRoles (if needed)
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['userRoles','userRoles.applicationRole'], // Make sure 'userRoles' relation exists
    });



    
    // Check if user exists
    if (!user) {
            throw new UnauthorizedException("User not found");
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    // Check if password is valid and user is active
    if (!isPasswordValid || !user.isActive) {
            throw new UnauthorizedException("Invalid password or user is inactive");
    }
    
    // If everything is valid, return the user
    return user;
  }
  async  getEmailOfUser(userPromise: Promise<ApplicationUser>): Promise<string | null> {
    try {
        // Wait for the promise to resolve
        const user = await userPromise;

        // Access the email attribute
        return user.email;
    } catch (error) {
        console.error("Error retrieving user:", error);
        return null; // or handle the error as needed
    }
  }
  async login(loginDto: LoginDto) {
    // Validate the user's credentials
    const user = await this.validateUser(loginDto.email, loginDto.password);
    console.log("user",user);
        const email = await this.getEmailOfUser(user);
    const roles = user.userRoles.map(userRole => ({
      id: userRole.applicationRole.id,
      roleName: userRole.applicationRole.name, // Adjust based on your ApplicationRole entity
    }));
   


    
    // Check if the ACSHoldingId exists
    // Generate JWT payload with roles
  
  
   
      // Retrieve affiliation data
    
      
 
  
    // Generate JWT token
    const token = this.jwtService.sign({ id: user.id });
    console.log("user to form token",user);
    // Changed to sign with an object
         var identity :Identity = {
      id:user.id,
      token:token,
      userName:user.userName,
      adresse:user.adresse,
      phoneNumber:user.phoneNumber,
      roles:roles,
      logo:null,
      fullName:user.fullName,
     }
     
    // Return the login response with token and user data
    return identity
    };


    async register(user: CreateUserDto) {
       console.log("user",user);
       console.log("await bcrypt.hash(user.password, 10)",await bcrypt.hash(user.password, 10));
       const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log("Hashed Password:", hashedPassword);
  const appuser = 
          /////////////////////////// PRESIDENT DE GROUPE ACS /////////////////////////////
            {
              id: uuid.v4(),
              userName: user.userName,
              email:user.email,
              normalizedUserName: user.email.toUpperCase(),
              normalizedEmail:user.email,
              passwordHash:hashedPassword,
              emailConfirmed: true,
              ACSHoldingId: "4e162ce6-34d1-40d0-ae6a-b5ac12705105",
              phoneNumber : user.phoneNumber,
              adresse:user.adresse
            };
            await this.userRepository.save(appuser);
            await this.seedAppUsersRole(appuser.id);


    }



  async  seedAppUsersRole(id:string){
     
const appUsersRoles =  
            // Admin
            { userId: id, roleId: "2" };
            // User
            
        
           // Fetch the actual user and role entities from the database
const user = await this.userRepository.findOne({ where: { id: appUsersRoles.userId } });
const role = await this.rolesRepository.findOne({ where: { id: appUsersRoles.roleId } });

 // Check if the user-role combination already exists
 const existingUserRole = await this.appUsersRolesRepository.findOne({ where: { user, applicationRole: role } });

 if (!existingUserRole) {
     // Create and save the new user-role record
     const userRole = new ApplicationUserRole();
     userRole.user = user;
     userRole.applicationRole = role;
     await this.appUsersRolesRepository.save(userRole);
     console.log("all saved");
 } 

    
}}
  

