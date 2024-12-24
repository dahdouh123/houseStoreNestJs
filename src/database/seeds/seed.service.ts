import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Guid } from "guid-typescript";
import { Repository, DeepPartial } from "typeorm";
import { ApplicationRole } from "../../modules/account/account/entities/ApplicationRole";
import { ApplicationUserRole } from "../../modules/account/account/entities/application-user-role.entity";
import { ApplicationUser } from "../../modules/account/account/entities/application-user.entity";
import { Roles } from "../../modules/account/account/Roles";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(
      
        
        @InjectRepository(ApplicationRole, 'storeidentity')
        private readonly roleRepository: Repository<ApplicationRole>,
        
        @InjectRepository(ApplicationUser, 'storeidentity')
        private readonly appUsersRepository: Repository<ApplicationUser>,
        
        @InjectRepository(ApplicationUserRole, 'storeidentity')
        private readonly appUsersRolesRepository: Repository<ApplicationUserRole>,
    ) {}

    async onModuleInit() {
        await this.seed();
    }

    private async seed() {
        await this.seedRoles();
        await this.seedAppUsers();
        await this.seedAppUsersRoles();
    }

   

    private async seedRoles() {
        function getEnumKeyByValue<T>(enumType: T, value: number): string | undefined {
            return Object.keys(enumType).find(key => (enumType as any)[key] === value);
          }
          
          const roles = [
            {
              id: Roles.Admin.toString(),
              name: getEnumKeyByValue(Roles, Roles.Admin), // Gets the key name
              normalizedName: getEnumKeyByValue(Roles, Roles.Admin)?.toUpperCase(),
              concurrencyStamp: '88f0dec2-5364-4881-4817-1f2a135a8641',
            },
            {
              id: Roles.User.toString(),
              name: getEnumKeyByValue(Roles, Roles.User),
              normalizedName: getEnumKeyByValue(Roles, Roles.User)?.toUpperCase(),
              concurrencyStamp: '1933aad7-120c-414f-a575-5681df13732f',
            }
          ];
          

          for (const role of roles) {
            const existingRole = await this.roleRepository.findOne({ where: { name: role.name } });
            if (!existingRole) {
              // Set the roleName explicitly if it's not set
              if (!role.name) {
                continue; // Skip saving if role name is empty
              }
              await this.roleRepository.save(role);
            }
          }
    }

    private async seedAppUsers() {
      //////////////////////////////////// DIRECTION GENERALE ACS //////////////////////////////////////////////////
        const applicationUsers = [
          /////////////////////////// PRESIDENT DE GROUPE ACS /////////////////////////////
            {
              id: "3cbf3570-0d44-4673-8746-29b7cf568093",
              userName: "admin@gmail.com",
              email: "admin@gmail.com",
              normalizedUserName: "admin@gmail.com",
              normalizedEmail: "admin@gmail.com",
              passwordHash:
                await bcrypt.hash("Supportagent123@", 10),
              emailConfirmed: true,
              ACSHoldingId: "4e162ce6-34d1-40d0-ae6a-b5ac12705105",
            },
            //////////////////////////////// MANAGER ACS (MR BOUIDER )//////////////////////////////////
            {
              id: "635dfbf8-fadb-4aa0-87f2-790fe9d4282b",
              userName: "user@gmail.com",
              email: "user@gmail.com",
              normalizedUserName: "user@gmail.com",
              normalizedEmail: "user@gmail.com",
              passwordHash:
                await bcrypt.hash("Supportagent123@", 10),
              emailConfirmed: true,
              ACSHoldingId: "4e162ce6-34d1-40d0-ae6a-b5ac12705105",
            }
            ///////////////////////////////////////// GROUPE ENAD //////////////////////////////////////////
            
/////////////////////////////////////////////////////////////////
    


          ];
          

        for (const user of applicationUsers) {
             
                await this.appUsersRepository.save(user);
            
        }
    
    }
    private async seedAppUsersRoles() {
        const appUsersRoles =  [
            // Admin
            { userId: "3cbf3570-0d44-4673-8746-29b7cf568093", roleId: "1" },
            // User
            { userId: "635dfbf8-fadb-4aa0-87f2-790fe9d4282b", roleId: "2" },
            
          
        ];
        
        for (const ur of appUsersRoles) {
           // Fetch the actual user and role entities from the database
const user = await this.appUsersRepository.findOne({ where: { id: ur.userId } });
const role = await this.roleRepository.findOne({ where: { id: ur.roleId } });

 // Check if the user-role combination already exists
 const existingUserRole = await this.appUsersRolesRepository.findOne({ where: { user, applicationRole: role } });

 if (!existingUserRole) {
     // Create and save the new user-role record
     const userRole = new ApplicationUserRole();
     userRole.user = user;
     userRole.applicationRole = role;
     await this.appUsersRolesRepository.save(userRole);
 } else {
 }


        }
    }
}
