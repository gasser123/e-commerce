import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AdminGuard } from "src/auth/guards/admin.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { User } from "src/users/user.entity";
import { ManageOrderService } from "./manage-order.service";
import { OrdersService } from "./orders.service";

@Controller("orders")
export class OrdersController {
  constructor(
    private manageOrderService: ManageOrderService,
    private ordersService: OrdersService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: User,
  ) {
    return this.manageOrderService.prepareOrder(createOrderDto, user);
  }

  @Get("/myorders")
  @UseGuards(AuthGuard)
  getMyOrders(@CurrentUser() user: User) {
    return this.ordersService.findBy({ user });
  }

  @Get("/:id")
  @UseGuards(AuthGuard, AdminGuard)
  async getOrderById(@Param("id", ParseIntPipe) id: number) {
    const order = await this.ordersService.findOneBy({ id });
    if (!order) {
      throw new NotFoundException("order not found");
    }

    return order;
  }

  @Patch("/:id/pay")
  @UseGuards(AuthGuard)
  updateOrderToPaid(@Param("id", ParseIntPipe) id: number) {
    return `update order with id ${id} to paid`;
  }

  @Patch("/:id/deliver")
  @UseGuards(AuthGuard, AdminGuard)
  updateOrderToDelivered(@Param("id", ParseIntPipe) id: number) {
    return `update order with id ${id} to delivered`;
  }

  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  getAllOrders() {
    return "get all orders";
  }
}
