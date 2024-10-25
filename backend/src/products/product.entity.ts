import { OrderItem } from "src/order-items/order-items.entity";
import { Review } from "src/reviews/review.entity";
import { User } from "src/users/user.entity";
import { DecimalColumnTransformer } from "src/util/DecimalColumnTransformer";
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
@Check(`"countInStock" >= 0`)
@Check(`"numReviews" >= 0`)
@Check(`"price" >= 0`)
@Check(`"rating" >= 0 AND "rating" <= 5`)
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  image: string;
  @Column()
  brand: string;
  @Column()
  category: string;
  @Column()
  description: string;
  @Column("decimal", {
    precision: 2,
    scale: 1,
    transformer: new DecimalColumnTransformer(),
    default: 0,
  })
  rating: number;
  @Column({ default: 0 })
  numReviews: number;
  @Column("decimal", {
    precision: 9,
    scale: 2,
    transformer: new DecimalColumnTransformer(),
  })
  price: number;
  @Column({ default: 0 })
  countInStock: number;

  @ManyToOne(() => User, (user) => user.products, { nullable: false })
  user: User;
  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
