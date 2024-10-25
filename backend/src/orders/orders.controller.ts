import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AdminGuard } from "src/auth/guards/admin.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { CreateOrderDto } from "./dtos/create-order.dto";
import { CurrentUser } from "src/decorators/current-user.decorator";
import { User } from "src/users/user.entity";
import { ManageOrderService } from "./manage-order.service";
import { OrdersService } from "./orders.service";
import { PaymentResultDto } from "./dtos/PaymentResult.dto";
import { PaymentResult } from "./schemas/PaymentResult";
import { ViewOrderGuard } from "./guards/view-order.guard";
import { GetOrdersDto } from "./dtos/get-orders.dto";

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
    return this.ordersService.findUserOrders({ user });
  }

  @Get("/:id")
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard, ViewOrderGuard)
  async getOrderById(@Param("id", ParseIntPipe) id: number) {
    const order = await this.ordersService.findOneByWithRelations({ id });
    if (!order) {
      throw new NotFoundException("order not found");
    }

    return order;
  }

  @Patch("/:id/pay")
  @UseGuards(AuthGuard)
  updateOrderToPaid(
    @Param("id", ParseIntPipe) id: number,
    @Body() paymentResultDto: PaymentResultDto,
  ) {
    const paymentResult: PaymentResult = {
      id: paymentResultDto.id,
      email_address: paymentResultDto.payer.email_address,
      status: paymentResultDto.status,
      update_time: paymentResultDto.update_time,
    };
    return this.ordersService.updateOrderToPaid(id, paymentResult);
  }

  @Patch("/:id/deliver")
  @UseGuards(AuthGuard, AdminGuard)
  updateOrderToDelivered(@Param("id", ParseIntPipe) id: number) {
    return this.ordersService.updateOrderToDelivered(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @UseGuards(AuthGuard, AdminGuard)
  async getAllOrders(
    @Query("page") page: string | undefined,
    @Query("search") search: string | undefined,
  ) {
    const pageNumber = Number(page) || 1;
    const pageSize = 4;
    const [orders, total] = await this.ordersService.findAndCountWithUsers(
      pageSize,
      pageNumber,
      search,
    );
    return new GetOrdersDto({
      orders,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
    });
  }
}
