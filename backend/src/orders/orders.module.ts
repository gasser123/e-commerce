import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "./order.entity";
import { AuthModule } from "src/auth/auth.module";
import { ProductsModule } from "src/products/products.module";
import { ManageOrderService } from "./manage-order.service";
@Module({
  controllers: [OrdersController],
  providers: [OrdersService, ManageOrderService],
  imports: [TypeOrmModule.forFeature([Order]), AuthModule, ProductsModule],
  exports: [OrdersService],
})
export class OrdersModule {}
