import { BadRequestException, Injectable } from "@nestjs/common";
import { ProductsService } from "src/products/products.service";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { addDecimal } from "src/util/util-functions";
import { OrderItem } from "src/order-items/order-items.entity";
import { Order } from "./order.entity";
import { User } from "src/users/user.entity";
import { OrdersService } from "./orders.service";

@Injectable()
export class ManageOrderService {
  constructor(
    private productsService: ProductsService,
    private ordersService: OrdersService,
  ) {}

  async prepareOrder(createOrderDto: CreateOrderDto, user: User) {
    const orderItemsInfo = await Promise.all(
      createOrderDto.orderItems.map(
        async (item): Promise<Pick<OrderItem, "qty" | "product">> => {
          const product = await this.productsService.findOneBy({ id: item.id });
          if (!product) {
            throw new BadRequestException("product in cart not found");
          }
          return {
            qty: item.qty,
            product,
          };
        },
      ),
    );
    // Calculate items price
    const itemsPrice = addDecimal(
      orderItemsInfo.reduce(
        (acc, item) => acc + item.product.price * item.qty,
        0,
      ),
    );
    if (itemsPrice !== createOrderDto.itemsPrice) {
      throw new BadRequestException("invalid items price at client");
    }
    // Calculate shipping price (free for orders over $100 else $10 shipping)
    const shippingPrice = addDecimal(itemsPrice > 100 ? 0 : 10);
    if (shippingPrice !== createOrderDto.shippingPrice) {
      throw new BadRequestException("invalid shipping price at client");
    }
    // Calculate tax price (15% tax)
    const taxPrice = addDecimal(itemsPrice * 0.15);
    if (taxPrice !== createOrderDto.taxPrice) {
      throw new BadRequestException("invalid tax price at client");
    }
    // Calculate total price
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    if (totalPrice !== createOrderDto.totalPrice) {
      throw new BadRequestException("invalid total price at client");
    }

    const orderInfo: Partial<Order> = {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      paymentMethod: createOrderDto.paymentMethod,
      shippingAddress: createOrderDto.shippingAddress,
      user,
    };

    return this.ordersService.createOrder(orderInfo, orderItemsInfo);
  }
}
