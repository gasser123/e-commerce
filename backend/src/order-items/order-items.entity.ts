import { Order } from "src/orders/order.entity";
import { Product } from "src/products/product.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
  Check,
} from "typeorm";

@Entity()
@Unique(["order", "product"])
@Check(`"qty" > 0`)
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  qty: number;
  @ManyToOne(() => Order, (order) => order.orderItems, { nullable: false })
  order: Order;
  @ManyToOne(() => Product, (product) => product.orderItems, {
    nullable: false,
  })
  product: Product;
}
