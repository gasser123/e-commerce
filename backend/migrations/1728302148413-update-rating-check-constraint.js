const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class UpdateRatingCheckConstraint1728302148413 {
    name = 'UpdateRatingCheckConstraint1728302148413'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "CHK_976b26973fd933ddc0eb2e0db0"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "CHK_c3cb7b6b803ee68ec9daece196"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "CHK_245a81016727117d169126597a" CHECK ("rating" >= 0 AND "rating" <= 5)`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "CHK_cd5d6989c099fbf3c68a7cf387" CHECK ("rating" >= 0 AND "rating" <= 5)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "CHK_cd5d6989c099fbf3c68a7cf387"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "CHK_245a81016727117d169126597a"`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "CHK_c3cb7b6b803ee68ec9daece196" CHECK ((rating >= 0))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "CHK_976b26973fd933ddc0eb2e0db0" CHECK ((rating >= (0)::numeric))`);
    }
}
