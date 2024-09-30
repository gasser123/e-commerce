import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { AuthModule } from "src/auth/auth.module";
import { MulterConfigService } from "./multer-config.service";
import { MulterModule } from "@nestjs/platform-express";
import { OrderItemsModule } from "src/order-items/order-items.module";
@Module({
  controllers: [ProductsController],
  providers: [ProductsService, MulterConfigService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    AuthModule,
    MulterModule.registerAsync({ useClass: MulterConfigService }),
    OrderItemsModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
