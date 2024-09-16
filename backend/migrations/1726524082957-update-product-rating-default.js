const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UpdateProductRatingDefault1726524082957 {
    name = 'UpdateProductRatingDefault1726524082957'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "rating" numeric(2,1) NOT NULL DEFAULT '0'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "rating" integer NOT NULL DEFAULT '0'`);
    }
}
