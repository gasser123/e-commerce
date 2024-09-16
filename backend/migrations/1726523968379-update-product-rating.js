const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UpdateProductRating1726523968379 {
    name = 'UpdateProductRating1726523968379'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "rating" numeric(2,1) NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "rating" integer NOT NULL DEFAULT '0'`);
    }
}
