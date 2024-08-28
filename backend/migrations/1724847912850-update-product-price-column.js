const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UpdateProductPriceColumn1724847912850 {
    name = 'UpdateProductPriceColumn1724847912850'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" numeric(9,2) NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "price" integer NOT NULL DEFAULT '0'`);
    }
}
