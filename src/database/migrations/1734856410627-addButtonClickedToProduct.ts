import { MigrationInterface, QueryRunner } from "typeorm";

export class AddButtonClickedToProduct1734856410627 implements MigrationInterface {
    name = 'AddButtonClickedToProduct1734856410627'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`buttonAddToCartClicked\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`buttonAddToCartClicked\``);
    }

}
