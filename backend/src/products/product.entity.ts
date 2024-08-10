import { OrderItem } from "src/order-items/order-items.entity";
import { Review } from "src/reviews/review.entity";
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
@Entity()
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
  @Column({ default: 0 })
  rating: number;
  @Column({ default: 0 })
  numReviews: number;
  @Column({ default: 0 })
  price: number;
  @Column({ default: 0 })
  countInStock: number;

  @ManyToOne(() => User, (user) => user.products)
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
