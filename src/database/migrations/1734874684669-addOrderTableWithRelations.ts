import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderTableWithRelations1734874684669 implements MigrationInterface {
    name = 'AddOrderTableWithRelations1734874684669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order_products\` (\`id\` varchar(36) NOT NULL, \`productId\` varchar(255) NOT NULL, \`price\` decimal NOT NULL, \`name\` varchar(255) NOT NULL, \`qte\` int NOT NULL, \`total\` decimal NOT NULL, \`orderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_infos\` (\`userId\` varchar(36) NOT NULL, \`userName\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`adresse\` varchar(255) NOT NULL, \`state\` varchar(255) NULL, \`postalcode\` varchar(255) NULL, PRIMARY KEY (\`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` varchar(36) NOT NULL, \`orderTotal\` decimal NOT NULL, \`numberOfProducts\` int NOT NULL, \`orderStatus\` enum ('1', '2', '3', '4', '5', '6', '7', '8') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_products\` ADD CONSTRAINT \`FK_28b66449cf7cd76444378ad4e92\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_products\` DROP FOREIGN KEY \`FK_28b66449cf7cd76444378ad4e92\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`user_infos\``);
        await queryRunner.query(`DROP TABLE \`order_products\``);
    }

}
