const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class RefinedEntities1726753220779 {
    name = 'RefinedEntities1726753220779'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a"`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "orderId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "paymentResult" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "paidAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "deliveredAt" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "CHK_c3cb7b6b803ee68ec9daece196" CHECK ("rating" >= 0)`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "CHK_976b26973fd933ddc0eb2e0db0" CHECK ("rating" >= 0)`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "CHK_d00ea1a666a7142a2f9f96bd2f" CHECK ("price" >= 0)`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "CHK_24dbb97975f8494359d9a84bdd" CHECK ("numReviews" >= 0)`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "CHK_c5f0596c783ec64f0c010e3910" CHECK ("countInStock" >= 0)`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "CHK_5b89e644bddb6a1935241e7254" CHECK ("qty" > 0)`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "CHK_a8858e5efc9c0b2c61f65a6fe3" CHECK ("totalPrice" >= 0)`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "CHK_6e9fcda41b6930f1e32161d9ed" CHECK ("shippingPrice" >= 0)`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "CHK_1be6ea3a743ac8ec2e4ac92fef" CHECK ("taxPrice" >= 0)`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "CHK_186b3758f2dd88252c8eed42d0" CHECK ("itemsPrice" >= 0)`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "UQ_7e383dc486afc7800bf87d1c11a" UNIQUE ("orderId", "productId")`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "UQ_7e383dc486afc7800bf87d1c11a"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "CHK_186b3758f2dd88252c8eed42d0"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "CHK_1be6ea3a743ac8ec2e4ac92fef"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "CHK_6e9fcda41b6930f1e32161d9ed"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "CHK_a8858e5efc9c0b2c61f65a6fe3"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "CHK_5b89e644bddb6a1935241e7254"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "CHK_c5f0596c783ec64f0c010e3910"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "CHK_24dbb97975f8494359d9a84bdd"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "CHK_d00ea1a666a7142a2f9f96bd2f"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "CHK_976b26973fd933ddc0eb2e0db0"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "CHK_c3cb7b6b803ee68ec9daece196"`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "deliveredAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "paidAt" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "paymentResult" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ALTER COLUMN "orderId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
