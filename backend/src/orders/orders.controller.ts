import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AdminGuard } from "src/auth/guards/admin.guard";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller("orders")
export class OrdersController {
  @Post()
  @UseGuards(AuthGuard)
  createOrder() {
    return "create order";
  }

  @Get("/myorders")
  @UseGuards(AuthGuard)
  getMyOrders() {
    return "get my orders";
  }

  @Get("/:id")
  @UseGuards(AuthGuard, AdminGuard)
  getOrderById(@Param("id", ParseIntPipe) id: number) {
    return `get order with id ${id}`;
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
