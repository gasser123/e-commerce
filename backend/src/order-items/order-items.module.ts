import { Module } from "@nestjs/common";
import { OrderItemsService } from "./order-items.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItem } from "./order-items.entity";
@Module({
  providers: [OrderItemsService],
  imports: [TypeOrmModule.forFeature([OrderItem])],
})
export class OrderItemsModule {}
