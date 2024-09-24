import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./order.entity";
import { OrderItem } from "src/order-items/order-items.entity";
import { DataSource } from "typeorm";
import { Product } from "src/products/product.entity";
import { PaymentResult } from "./schemas/PaymentResult";
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
      const orderInstance = queryRunner.manager.create(Order, orderInfo);
      const order = await queryRunner.manager.save(orderInstance);
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
        orderItemInstance.order = order;
        await queryRunner.manager.save(orderItemInstance);
      }

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

  findAllWithUsers() {
    return this.repo.find({ relations: { user: true } });
  }

  findOneBy(orderInfo: Partial<Order>) {
    return this.repo.findOneBy(orderInfo);
  }

  findUserOrders(orderInfo: Partial<Order>) {
    return this.repo.find({
      where: { user: { id: orderInfo.user?.id } },
    });
  }

  findOneByWithRelations(orderInfo: Partial<Order>) {
    return this.repo.findOne({
      where: orderInfo,
      relations: {
        orderItems: {
          product: true,
        },
        user: true,
      },
    });
  }

  async findOrderUser(orderInfo: Partial<Order>) {
    const order = await this.repo.findOne({
      where: orderInfo,
      relations: {
        user: true,
      },
    });

    if (!order) {
      throw new NotFoundException("order not found");
    }

    return order.user;
  }

  async updateOrderToPaid(id: number, paymentResult: PaymentResult) {
    const order = await this.findOneBy({ id });
    if (!order) {
      throw new NotFoundException("order not found");
    }

    if (order.isPaid) {
      throw new BadRequestException("order is already paid");
    }
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      ...paymentResult,
    };

    return this.repo.save(order);
  }

  async updateOrderToDelivered(id: number) {
    const order = await this.findOneBy({ id });
    if (!order) {
      throw new NotFoundException("order not found");
    }

    if (!order.isPaid) {
      throw new BadRequestException("order is not paid");
    }
    if (order.isDelivered) {
      throw new BadRequestException("order is already delivered");
    }
    order.isDelivered = true;
    order.deliveredAt = new Date();

    return this.repo.save(order);
  }
}
