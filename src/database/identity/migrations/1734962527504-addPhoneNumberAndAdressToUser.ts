import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhoneNumberAndAdressToUser1734962527504 implements MigrationInterface {
    name = 'AddPhoneNumberAndAdressToUser1734962527504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`application_user\` ADD \`phoneNumber\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`application_user\` ADD \`adresse\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` DROP FOREIGN KEY \`FK_34ae70c064f705cb43a485fca8e\``);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` DROP FOREIGN KEY \`FK_ee8f20f500fb4f33c845a89e17d\``);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` CHANGE \`applicationRoleId\` \`applicationRoleId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`application_user\` CHANGE \`fullName\` \`fullName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`application_user\` CHANGE \`isShowPhoneNumberInOdoo\` \`isShowPhoneNumberInOdoo\` tinyint NULL`);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` ADD CONSTRAINT \`FK_34ae70c064f705cb43a485fca8e\` FOREIGN KEY (\`userId\`) REFERENCES \`application_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` ADD CONSTRAINT \`FK_ee8f20f500fb4f33c845a89e17d\` FOREIGN KEY (\`applicationRoleId\`) REFERENCES \`application_role\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`application_user_role\` DROP FOREIGN KEY \`FK_ee8f20f500fb4f33c845a89e17d\``);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` DROP FOREIGN KEY \`FK_34ae70c064f705cb43a485fca8e\``);
        await queryRunner.query(`ALTER TABLE \`application_user\` CHANGE \`isShowPhoneNumberInOdoo\` \`isShowPhoneNumberInOdoo\` tinyint NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`application_user\` CHANGE \`fullName\` \`fullName\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` CHANGE \`applicationRoleId\` \`applicationRoleId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` ADD CONSTRAINT \`FK_ee8f20f500fb4f33c845a89e17d\` FOREIGN KEY (\`applicationRoleId\`) REFERENCES \`application_role\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application_user_role\` ADD CONSTRAINT \`FK_34ae70c064f705cb43a485fca8e\` FOREIGN KEY (\`userId\`) REFERENCES \`application_user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application_user\` DROP COLUMN \`adresse\``);
        await queryRunner.query(`ALTER TABLE \`application_user\` DROP COLUMN \`phoneNumber\``);
    }

}
