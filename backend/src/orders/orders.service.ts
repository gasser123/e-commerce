import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
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

  findAndCountWithUsers(
    pageSize: number,
    pageNumber: number,
    keyword?: string,
  ) {
    return this.repo.findAndCount({
      where: keyword
        ? [
            {
              id: !Number.isNaN(parseInt(keyword))
                ? parseInt(keyword)
                : undefined,
            },
            {
              user: { name: ILike(`%${keyword}%`) },
            },
          ]
        : undefined,
      relations: { user: true },
      order: {
        createdAt: "DESC",
      },
      take: pageSize,
      skip: pageSize * (pageNumber - 1),
    });
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

  findOneByJoinOrderItemJoinProduct(orderInfo: Partial<Order>) {
    return this.repo.findOne({
      where: orderInfo,
      relations: {
        orderItems: {
          product: true,
        },
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

  async updateOrderToPaid(
    id: number,
    paymentResult: PaymentResult,
  ): Promise<Order> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const order = await queryRunner.manager.findOne(Order, {
        where: { id },
        relations: {
          orderItems: {
            product: true,
          },
        },
      });
      if (!order) {
        throw new NotFoundException("order not found");
      }

      if (order.isPaid) {
        throw new BadRequestException("order is already paid");
      }

      for (const orderItem of order.orderItems) {
        orderItem.product.countInStock =
          orderItem.product.countInStock - orderItem.qty;
        await queryRunner.manager.save(orderItem.product);
      }

      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        ...paymentResult,
      };
      const savedOrder = await queryRunner.manager.save(order);
      await queryRunner.commitTransaction();
      return savedOrder;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
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
