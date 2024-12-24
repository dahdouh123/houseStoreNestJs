import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAdresseTypeOfPlaces1734612958117 implements MigrationInterface {
    name = 'ChangeAdresseTypeOfPlaces1734612958117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`places\` DROP COLUMN \`addresse\``);
        await queryRunner.query(`ALTER TABLE \`places\` ADD \`addresse\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`places\` DROP COLUMN \`addresse\``);
        await queryRunner.query(`ALTER TABLE \`places\` ADD \`addresse\` decimal(10,0) NOT NULL`);
    }

}
