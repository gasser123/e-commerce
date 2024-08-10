import { OrderItem } from "src/order-items/order-items.entity";
import { User } from "src/users/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import ShippingAddress from "./interfaces/ShippingAddress";
import PaymentResult from "./interfaces/PaymentResult";
import { DecimalColumnTransformer } from "src/util/DecimalColumnTransformer";
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "jsonb",
  })
  shippingAddress: ShippingAddress;

  @Column()
  paymentMethod: string;

  @Column({ type: "jsonb" })
  paymentResult: PaymentResult;

  @Column("decimal", {
    precision: 9,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  itemsPrice: number;
  @Column("decimal", {
    precision: 9,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  taxPrice: number;

  @Column("decimal", {
    precision: 9,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  shippingPrice: number;

  // decimal values are returned as string from database
  @Column("decimal", {
    precision: 9,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  totalPrice: number;
  @Column({ default: false })
  isPaid: boolean;
  // TIMESTAMP values are stored relative to the time zone of the server, whereas TIMESTAMPTZ are stored relative to UTC
  // TIMESTAMP and TIMESTAMPTZ are returned as Date while DATE type is returned as string
  @Column({ type: "timestamptz" })
  paidAt: Date;
  @Column({ default: false })
  isDelivered: boolean;
  @Column({ type: "timestamptz" })
  deliveredAt: Date;
  @ManyToOne(() => User, (user) => user.orders)
  user: User;
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}