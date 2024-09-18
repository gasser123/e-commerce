import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./order.entity";
import { OrderItem } from "src/order-items/order-items.entity";
import { DataSource } from "typeorm";
import { Product } from "src/products/product.entity";
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private repo: Repository<Order>,

    private dataSource: DataSource,
  ) {}
  async createOrder(
    orderInfo: Partial<Order>,
    orderItemsInfo: Pick<OrderItem, "qty" | "product">[],
  ): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderItems: OrderItem[] = [];
      for (const orderItemInfo of orderItemsInfo) {
        const orderItemInstance = queryRunner.manager.create(
          OrderItem,
          orderItemInfo,
        );
        const product = await queryRunner.manager.findOneBy(Product, {
          id: orderItemInstance.product.id,
        });
        if (!product) {
          throw new BadRequestException("product in cart not found");
        }
        if (product.countInStock - orderItemInstance.qty < 0) {
          throw new BadRequestException(
            "product count in stock is less than quantity required",
          );
        }

        product.countInStock = product.countInStock - orderItemInstance.qty;
        await queryRunner.manager.save(product);
        orderItemInstance.product = product;
        const orderItem = await queryRunner.manager.save(orderItemInstance);
        orderItems.push(orderItem);
      }

      const orderInstance = queryRunner.manager.create(Order, orderInfo);
      orderInstance.orderItems = orderItems;
      const order = await queryRunner.manager.save(orderInstance);
      await queryRunner.commitTransaction();

      return order;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findBy(orderInfo: Partial<Order>) {
    return this.repo.findBy(orderInfo);
  }

  findOneBy(orderInfo: Partial<Order>) {
    return this.repo.findOneBy(orderInfo);
  }
}
