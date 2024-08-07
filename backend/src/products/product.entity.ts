import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
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
  //TODO
  @Column()
  userId: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
