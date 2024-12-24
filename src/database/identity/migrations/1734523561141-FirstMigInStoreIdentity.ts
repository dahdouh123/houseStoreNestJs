import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigInStoreIdentity1734523561141 implements MigrationInterface {
    name = 'FirstMigInStoreIdentity1734523561141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`application_role\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_2b4bcd1fc4648add13f59cd92a\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`application_user_role\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(36) NULL, \`applicationRoleId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`application_user\` (\`id\` varchar(36) NOT NULL, \`userName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`fullName\` varchar(255) NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`passwordHash\` varchar(255) NOT NULL, \`isShowPhoneNumberInOdoo\` tinyint NULL, UNIQUE INDEX \`IDX_8533cedc452c829104f8d868c2\` (\`userName\`), UNIQUE INDEX \`IDX_47745627359dd6ef1c7cd5f8b1\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` ADD CONSTRAINT \`FK_34ae70c064f705cb43a485fca8e\` FOREIGN KEY (\`userId\`) REFERENCES \`application_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` ADD CONSTRAINT \`FK_ee8f20f500fb4f33c845a89e17d\` FOREIGN KEY (\`applicationRoleId\`) REFERENCES \`application_role\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`application_user_role\` DROP FOREIGN KEY \`FK_ee8f20f500fb4f33c845a89e17d\``);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` DROP FOREIGN KEY \`FK_34ae70c064f705cb43a485fca8e\``);
        await queryRunner.query(`DROP INDEX \`IDX_47745627359dd6ef1c7cd5f8b1\` ON \`application_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_8533cedc452c829104f8d868c2\` ON \`application_user\``);
        await queryRunner.query(`DROP TABLE \`application_user\``);
        await queryRunner.query(`DROP TABLE \`application_user_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_2b4bcd1fc4648add13f59cd92a\` ON \`application_role\``);
        await queryRunner.query(`DROP TABLE \`application_role\``);
    }

}
