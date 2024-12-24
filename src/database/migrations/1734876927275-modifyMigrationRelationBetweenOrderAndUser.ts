import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyMigrationRelationBetweenOrderAndUser1734876927275 implements MigrationInterface {
    name = 'ModifyMigrationRelationBetweenOrderAndUser1734876927275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`userInfosUserId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP FOREIGN KEY \`FK_28b66449cf7cd76444378ad4e92\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` CHANGE \`orderId\` \`orderId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_infos\` CHANGE \`state\` \`state\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user_infos\` CHANGE \`postalcode\` \`postalcode\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD CONSTRAINT \`FK_28b66449cf7cd76444378ad4e92\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_966c6d89de45374e3c244247293\` FOREIGN KEY (\`userInfosUserId\`) REFERENCES \`user_infos\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_966c6d89de45374e3c244247293\``);
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP FOREIGN KEY \`FK_28b66449cf7cd76444378ad4e92\``);
        await queryRunner.query(`ALTER TABLE \`user_infos\` CHANGE \`postalcode\` \`postalcode\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_infos\` CHANGE \`state\` \`state\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_products\` CHANGE \`orderId\` \`orderId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD CONSTRAINT \`FK_28b66449cf7cd76444378ad4e92\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`userInfosUserId\``);
    }

}
