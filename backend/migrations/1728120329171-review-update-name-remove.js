const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class ReviewUpdateNameRemove1728120329171 {
    name = 'ReviewUpdateNameRemove1728120329171'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "name"`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "review" ADD "name" character varying NOT NULL`);
    }
}
