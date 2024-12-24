import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1734603745916 implements MigrationInterface {
    name = 'InitMigration1734603745916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`ref\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` decimal NOT NULL, \`quantity\` int NOT NULL, \`place_id\` int NOT NULL, \`image\` text NOT NULL, \`category\` varchar(255) NOT NULL, \`qrcode\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`products\``);
    }

}
