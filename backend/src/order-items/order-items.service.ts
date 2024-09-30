import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from "./order-items.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem) private repo: Repository<OrderItem>,
  ) {}

  create(orderItemInfo: Partial<OrderItem>): Promise<OrderItem> {
    const orderItem = this.repo.create(orderItemInfo);
    return this.repo.save(orderItem);
  }

  findBy(orderItemInfo: Partial<OrderItem>) {
    return this.repo.findBy(orderItemInfo);
  }

  findWithProduct(id: number) {
    return this.repo.find({
      where: {
        product: { id },
      },
    });
  }
}
