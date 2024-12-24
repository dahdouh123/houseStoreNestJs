import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategAndPlaces1734609196787 implements MigrationInterface {
    name = 'AddCategAndPlaces1734609196787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`places\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`ref\` varchar(255) NOT NULL, \`maplocalisation\` text NOT NULL, \`addresse\` decimal NOT NULL, \`category\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`places\``);
    }

}
