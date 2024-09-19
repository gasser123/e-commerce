import { Product } from "src/products/product.entity";
import { User } from "src/users/user.entity";
import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity()
@Check(`"rating" >= 0`)
export class Review {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @ManyToOne(() => User, (user) => user.reviews, { nullable: false })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, { nullable: false })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
